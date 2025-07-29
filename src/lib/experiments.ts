// Experiment configuration
export interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
  traffic: number; // 0-1, percentage of users to include
  status: 'draft' | 'running' | 'paused' | 'completed';
}

export interface Variant {
  id: string;
  name: string;
  weight: number; // 0-1, percentage of experiment users
  config: Record<string, unknown>;
}

// Active experiments configuration
export const experiments: Experiment[] = [
  {
    id: 'hero-cta-test',
    name: 'Hero CTA Button Test',
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
    ],
    traffic: 0.8, // 80% of users
    status: 'running'
  },
  {
    id: 'theme-default-test',
    name: 'Default Theme Test',
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
    ],
    traffic: 0.5,
    status: 'running'
  }
];

// Hash function for consistent user bucketing
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Get user ID (could be session ID, IP, or persistent cookie)
function getUserId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let userId = localStorage.getItem('experiment-user-id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('experiment-user-id', userId);
  }
  return userId;
}

// Determine if user should be in experiment
function shouldIncludeUser(experimentId: string, traffic: number): boolean {
  const userId = getUserId();
  const hash = hashString(`${experimentId}-${userId}`);
  const bucket = (hash % 10000) / 10000; // 0-1
  return bucket < traffic;
}

// Get variant for user
function getVariantForUser(experimentId: string, variants: Variant[]): Variant {
  const userId = getUserId();
  const hash = hashString(`${experimentId}-variant-${userId}`);
  const bucket = (hash % 10000) / 10000; // 0-1
  
  let cumulativeWeight = 0;
  for (const variant of variants) {
    cumulativeWeight += variant.weight;
    if (bucket < cumulativeWeight) {
      return variant;
    }
  }
  
  // Fallback to first variant
  return variants[0];
}

// Main function to get experiment variant
export function getExperimentVariant(experimentId: string): Variant | null {
  const experiment = experiments.find(exp => exp.id === experimentId);
  
  if (!experiment || experiment.status !== 'running') {
    return null;
  }
  
  if (!shouldIncludeUser(experimentId, experiment.traffic)) {
    return null;
  }
  
  return getVariantForUser(experimentId, experiment.variants);
}

// Track experiment exposure
export function trackExperimentExposure(experimentId: string, variantId: string) {
  if (typeof window === 'undefined') return;
  
  // Store in localStorage for analytics
  const exposures = JSON.parse(localStorage.getItem('experiment-exposures') || '{}');
  exposures[experimentId] = {
    variantId,
    timestamp: Date.now(),
    userId: getUserId()
  };
  localStorage.setItem('experiment-exposures', JSON.stringify(exposures));
  
  // You can also send to analytics service here
  console.log(`Experiment exposure: ${experimentId} - ${variantId}`);
}

// Track conversion events
export function trackConversion(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  const conversions = JSON.parse(localStorage.getItem('experiment-conversions') || '[]');
  conversions.push({
    eventName,
    data,
    timestamp: Date.now(),
    userId: getUserId(),
    experiments: JSON.parse(localStorage.getItem('experiment-exposures') || '{}')
  });
  localStorage.setItem('experiment-conversions', JSON.stringify(conversions));
  
  // Send to analytics service
  console.log(`Conversion tracked: ${eventName}`, data);
}
