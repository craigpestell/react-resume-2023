// Utility types for better type safety
export interface ExperimentConfig {
  [key: string]: unknown;
}

export interface CTAConfig extends ExperimentConfig {
  ctaText: string;
  ctaStyle: 'primary' | 'gradient' | 'outline';
  showSecondaryButton: boolean;
  secondaryText?: string;
}

export interface ThemeConfig extends ExperimentConfig {
  defaultTheme: string;
  defaultDarkMode: boolean;
}

// Analytics provider type definitions
interface AnalyticsWindow extends Window {
  gtag?: (command: string, target: string, config?: Record<string, unknown>) => void;
  mixpanel?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string) => void;
    people: {
      set: (properties: Record<string, unknown>) => void;
    };
  };
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, properties?: Record<string, unknown>) => void;
  };
  amplitude?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
    setUserId: (userId: string) => void;
    setUserProperties: (properties: Record<string, unknown>) => void;
  };
}

// Analytics integration helpers
export class ExperimentAnalytics {
  static sendToAnalytics(event: string, data: Record<string, unknown>) {
    const analyticsWindow = window as AnalyticsWindow;
    
    // Google Analytics 4 example
    if (typeof window !== 'undefined' && analyticsWindow.gtag) {
      analyticsWindow.gtag('event', event, {
        custom_parameter_1: data.variant,
        custom_parameter_2: data.experimentId,
        ...data
      });
    }

    // Mixpanel example
    if (typeof window !== 'undefined' && analyticsWindow.mixpanel) {
      analyticsWindow.mixpanel.track(event, data);
    }

    // PostHog example
    if (typeof window !== 'undefined' && analyticsWindow.posthog) {
      analyticsWindow.posthog.capture(event, data);
    }

    // Amplitude example
    if (typeof window !== 'undefined' && analyticsWindow.amplitude) {
      analyticsWindow.amplitude.track(event, data);
    }
  }

  static identify(userId: string, traits?: Record<string, unknown>) {
    const analyticsWindow = window as AnalyticsWindow;
    
    if (typeof window !== 'undefined') {
      // Set user properties in various analytics tools
      if (analyticsWindow.gtag) {
        analyticsWindow.gtag('config', 'GA_MEASUREMENT_ID', {
          user_id: userId,
          custom_map: traits
        });
      }

      if (analyticsWindow.mixpanel) {
        analyticsWindow.mixpanel.identify(userId);
        if (traits) analyticsWindow.mixpanel.people.set(traits);
      }

      if (analyticsWindow.posthog) {
        analyticsWindow.posthog.identify(userId, traits);
      }

      if (analyticsWindow.amplitude) {
        analyticsWindow.amplitude.setUserId(userId);
        if (traits) analyticsWindow.amplitude.setUserProperties(traits);
      }
    }
  }
}

// Cookie-based user bucketing (for server-side rendering)
export function setExperimentCookie(experimentId: string, variantId: string) {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // 30 days
    document.cookie = `experiment_${experimentId}=${variantId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
}

export function getExperimentCookie(experimentId: string): string | null {
  if (typeof document !== 'undefined') {
    const name = `experiment_${experimentId}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
}

// Feature flag helpers
export function isFeatureEnabled(flagName: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const flags = JSON.parse(localStorage.getItem('feature-flags') || '{}');
  return flags[flagName] === true;
}

export function setFeatureFlag(flagName: string, enabled: boolean) {
  if (typeof window === 'undefined') return;
  
  const flags = JSON.parse(localStorage.getItem('feature-flags') || '{}');
  flags[flagName] = enabled;
  localStorage.setItem('feature-flags', JSON.stringify(flags));
}

// Statistical significance calculator
export function calculateSignificance(
  controlConversions: number,
  controlSample: number,
  variantConversions: number,
  variantSample: number
): { significant: boolean; pValue: number; confidenceLevel: number } {
  // Simplified z-test for conversion rate comparison
  const p1 = controlConversions / controlSample || 0;
  const p2 = variantConversions / variantSample || 0;
  
  const pooledP = (controlConversions + variantConversions) / (controlSample + variantSample) || 0;
  const standardError = Math.sqrt(pooledP * (1 - pooledP) * (1/controlSample + 1/variantSample));
  
  if (standardError === 0) {
    return { significant: false, pValue: 1, confidenceLevel: 0 };
  }
  
  const zScore = Math.abs(p1 - p2) / standardError;
  
  // Approximate p-value calculation (simplified)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  const significant = pValue < 0.05;
  const confidenceLevel = (1 - pValue) * 100;
  
  return { significant, pValue, confidenceLevel };
}

// Standard normal cumulative distribution function approximation
function normalCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Error function approximation
function erf(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}
