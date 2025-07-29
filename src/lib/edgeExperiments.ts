// Edge Config types
export interface EdgeExperiment {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic: number; // 0-1
  variants: EdgeVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EdgeVariant {
  id: string;
  name: string;
  weight: number; // 0-1
  config: Record<string, unknown>;
}

export interface ExperimentAssignment {
  experimentId: string;
  variantId: string;
  timestamp: number;
}

// Default experiments (fallback when Edge Config is unavailable)
const DEFAULT_EXPERIMENTS: EdgeExperiment[] = [
  {
    id: 'hero-cta-test',
    name: 'Hero CTA Button Test',
    status: 'running',
    traffic: 0.8,
    variants: [
      {
        id: 'control',
        name: 'Original Download Resume',
        weight: 0.5,
        config: {
          ctaText: 'Download Resume',
          ctaStyle: 'primary',
          showSecondaryButton: false
        }
      },
      {
        id: 'variant-a',
        name: 'Get My Resume',
        weight: 0.3,
        config: {
          ctaText: 'Get My Resume',
          ctaStyle: 'gradient',
          showSecondaryButton: true,
          secondaryText: 'View Online'
        }
      },
      {
        id: 'variant-b',
        name: 'Hire Me Now',
        weight: 0.2,
        config: {
          ctaText: 'Hire Me Now',
          ctaStyle: 'outline',
          showSecondaryButton: true,
          secondaryText: 'Download Resume'
        }
      }
    ]
  },
  {
    id: 'theme-default-test',
    name: 'Default Theme Test',
    status: 'running',
    traffic: 0.5,
    variants: [
      {
        id: 'control',
        name: 'Default Light',
        weight: 0.5,
        config: {
          defaultTheme: 'default',
          defaultDarkMode: false
        }
      },
      {
        id: 'variant-a',
        name: 'Cyberpunk Dark',
        weight: 0.5,
        config: {
          defaultTheme: 'cyberpunk',
          defaultDarkMode: true
        }
      }
    ]
  }
];

// Cache for Edge Config data
let experimentsCache: EdgeExperiment[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch experiments from Vercel Edge Config via API route
 */
export async function getExperimentsFromEdgeConfig(): Promise<EdgeExperiment[]> {
  // Check cache first
  const now = Date.now();
  if (experimentsCache && (now - cacheTimestamp) < CACHE_TTL) {
    return experimentsCache;
  }

  try {
    // Fetch experiments from API route (which uses Edge Config server-side)
    const response = await fetch('/api/experiments', {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.experiments)) {
        experimentsCache = data.experiments;
        cacheTimestamp = now;
        console.log(`Experiments loaded from ${data.source}:`, data.experiments.length, 'experiments');
        return data.experiments;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch experiments from API:', error);
  }

  // Fallback to default experiments
  experimentsCache = DEFAULT_EXPERIMENTS;
  cacheTimestamp = now;
  console.log('Using fallback experiments:', DEFAULT_EXPERIMENTS.length, 'experiments');
  return DEFAULT_EXPERIMENTS;
}

/**
 * Get a specific experiment by ID
 */
export async function getExperiment(experimentId: string): Promise<EdgeExperiment | null> {
  try {
    const response = await fetch(`/api/experiments/${experimentId}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.experiment) {
        return data.experiment;
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch experiment ${experimentId}:`, error);
  }

  // Fallback: get from cached experiments
  const experiments = await getExperimentsFromEdgeConfig();
  return experiments.find(exp => exp.id === experimentId) || null;
}

/**
 * Generate a stable user ID for experiment bucketing
 */
function getUserId(): string {
  if (typeof window === 'undefined') {
    // Server-side: use a random ID (will be overridden on client)
    return 'server-' + Math.random().toString(36).substr(2, 9);
  }
  
  let userId = localStorage.getItem('experiment-user-id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('experiment-user-id', userId);
  }
  return userId;
}

/**
 * Hash function for deterministic bucketing
 */
function hashUserToExperiment(userId: string, experimentId: string): number {
  let hash = 0;
  const str = `${userId}-${experimentId}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

/**
 * Determine if user should be included in experiment
 */
function shouldIncludeUser(userId: string, experiment: EdgeExperiment): boolean {
  const hash = hashUserToExperiment(userId, experiment.id);
  return hash < experiment.traffic;
}

/**
 * Get variant assignment for user
 */
function getVariantForUser(userId: string, experiment: EdgeExperiment): EdgeVariant | null {
  if (!shouldIncludeUser(userId, experiment)) {
    return null;
  }

  const hash = hashUserToExperiment(userId, `${experiment.id}-variant`);
  let cumulativeWeight = 0;
  
  for (const variant of experiment.variants) {
    cumulativeWeight += variant.weight;
    if (hash < cumulativeWeight) {
      return variant;
    }
  }
  
  // Fallback to first variant
  return experiment.variants[0] || null;
}

/**
 * Get experiment variant assignment (main function)
 */
export async function getExperimentVariant(experimentId: string): Promise<EdgeVariant | null> {
  const experiment = await getExperiment(experimentId);
  
  if (!experiment || experiment.status !== 'running') {
    return null;
  }
  
  const userId = getUserId();
  return getVariantForUser(userId, experiment);
}

/**
 * Track experiment exposure
 */
export function trackExperimentExposure(experimentId: string, variantId: string) {
  if (typeof window === 'undefined') return;
  
  const userId = getUserId();
  const exposure = {
    experimentId,
    variantId,
    userId,
    timestamp: Date.now()
  };
  
  // Store locally for immediate use
  const exposures = JSON.parse(localStorage.getItem('experiment-exposures') || '{}');
  exposures[experimentId] = exposure;
  localStorage.setItem('experiment-exposures', JSON.stringify(exposures));
  
  // Send to analytics (implement your preferred analytics service)
  sendExposureToAnalytics(exposure);
}

/**
 * Track conversion events
 */
export function trackConversion(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  const userId = getUserId();
  const exposures = JSON.parse(localStorage.getItem('experiment-exposures') || '{}');
  
  const conversion = {
    eventName,
    data,
    userId,
    timestamp: Date.now(),
    experiments: exposures
  };
  
  // Store locally for dashboard
  const conversions = JSON.parse(localStorage.getItem('experiment-conversions') || '[]');
  conversions.push(conversion);
  localStorage.setItem('experiment-conversions', JSON.stringify(conversions));
  
  // Send to analytics
  sendConversionToAnalytics(conversion);
}

// Analytics window type definitions
interface AnalyticsWindow extends Window {
  gtag?: (command: string, target: string, config?: Record<string, unknown>) => void;
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
  };
  mixpanel?: {
    track: (event: string, properties?: Record<string, unknown>) => void;
  };
}

/**
 * Send exposure data to analytics service
 */
function sendExposureToAnalytics(exposure: ExperimentAssignment & { userId: string }) {
  const analyticsWindow = window as AnalyticsWindow;
  
  // Google Analytics 4
  if (typeof window !== 'undefined' && analyticsWindow.gtag) {
    analyticsWindow.gtag('event', 'experiment_exposure', {
      experiment_id: exposure.experimentId,
      variant_id: exposure.variantId,
      user_id: exposure.userId
    });
  }
  
  // PostHog
  if (typeof window !== 'undefined' && analyticsWindow.posthog) {
    analyticsWindow.posthog.capture('experiment_exposure', {
      experiment_id: exposure.experimentId,
      variant_id: exposure.variantId,
      $set: { experiment_user_id: exposure.userId }
    });
  }
  
  // Mixpanel
  if (typeof window !== 'undefined' && analyticsWindow.mixpanel) {
    analyticsWindow.mixpanel.track('Experiment Exposure', {
      experiment_id: exposure.experimentId,
      variant_id: exposure.variantId
    });
  }
  
  // Custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/exposure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exposure)
    }).catch(err => console.warn('Failed to send exposure to analytics:', err));
  }
}

/**
 * Send conversion data to analytics service
 */
function sendConversionToAnalytics(conversion: {
  eventName: string;
  data?: Record<string, unknown>;
  userId: string;
  timestamp: number;
  experiments: Record<string, unknown>;
}) {
  const analyticsWindow = window as AnalyticsWindow;
  
  // Google Analytics 4
  if (typeof window !== 'undefined' && analyticsWindow.gtag) {
    analyticsWindow.gtag('event', conversion.eventName, {
      ...conversion.data,
      user_id: conversion.userId
    });
  }
  
  // PostHog
  if (typeof window !== 'undefined' && analyticsWindow.posthog) {
    analyticsWindow.posthog.capture(conversion.eventName, {
      ...conversion.data,
      experiments: conversion.experiments
    });
  }
  
  // Custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(conversion)
    }).catch(err => console.warn('Failed to send conversion to analytics:', err));
  }
}

/**
 * Clear experiment cache (useful for testing)
 */
export function clearExperimentsCache() {
  experimentsCache = null;
  cacheTimestamp = 0;
}
