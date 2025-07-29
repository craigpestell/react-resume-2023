// Edge Config A/B Testing Library
// Only uses Vercel Edge Config via API routes

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

// Cache for experiments
let experimentsCache: EdgeExperiment[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch experiments from Edge Config via API
 */
export async function getExperiments(): Promise<EdgeExperiment[]> {
  // Check cache first
  const now = Date.now();
  if (experimentsCache && (now - cacheTimestamp) < CACHE_TTL) {
    return experimentsCache;
  }

  try {
    const response = await fetch('/api/experiments', {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.experiments)) {
        experimentsCache = data.experiments;
        cacheTimestamp = now;
        return data.experiments;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch experiments:', error);
  }

  // Return empty array if failed
  return [];
}

/**
 * Get a specific experiment by ID
 */
export async function getExperiment(experimentId: string): Promise<EdgeExperiment | null> {
  const experiments = await getExperiments();
  return experiments.find(exp => exp.id === experimentId) || null;
}

/**
 * Generate user ID for consistent bucketing
 */
function getUserId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let userId = localStorage.getItem('ab-user-id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('ab-user-id', userId);
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
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

/**
 * Check if user should be included in experiment
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
  
  return experiment.variants[0] || null;
}

/**
 * Get experiment variant assignment
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
  
  // Store locally
  const exposures = JSON.parse(localStorage.getItem('ab-exposures') || '{}');
  exposures[experimentId] = exposure;
  localStorage.setItem('ab-exposures', JSON.stringify(exposures));
  
  // Send to analytics
  sendToAnalytics('experiment_exposure', {
    experiment_id: experimentId,
    variant_id: variantId,
    user_id: userId
  });
}

/**
 * Track conversion events
 */
export function trackConversion(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  const userId = getUserId();
  const exposures = JSON.parse(localStorage.getItem('ab-exposures') || '{}');
  
  const conversion = {
    eventName,
    data,
    userId,
    timestamp: Date.now(),
    experiments: exposures
  };
  
  // Store locally
  const conversions = JSON.parse(localStorage.getItem('ab-conversions') || '[]');
  conversions.push(conversion);
  localStorage.setItem('ab-conversions', JSON.stringify(conversions));
  
  // Send to analytics
  sendToAnalytics(eventName, {
    ...data,
    user_id: userId,
    experiments: Object.keys(exposures).map(expId => ({
      experiment_id: expId,
      variant_id: exposures[expId].variantId
    }))
  });
}

/**
 * Send data to analytics services
 */
function sendToAnalytics(event: string, data: Record<string, unknown>) {
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics:', event, data);
  }

  // Type-safe analytics integrations
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if ('gtag' in window) {
      (window as { gtag: (command: string, event: string, data: Record<string, unknown>) => void }).gtag('event', event, data);
    }
    
    // PostHog
    if ('posthog' in window) {
      (window as { posthog: { capture: (event: string, data: Record<string, unknown>) => void } }).posthog.capture(event, data);
    }
    
    // Mixpanel
    if ('mixpanel' in window) {
      (window as { mixpanel: { track: (event: string, data: Record<string, unknown>) => void } }).mixpanel.track(event, data);
    }
  }
  
  // Send to API endpoint for server-side analytics
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, data })
  }).catch(err => console.warn('Failed to send analytics:', err));
}

/**
 * Clear cache (useful for testing)
 */
export function clearCache() {
  experimentsCache = null;
  cacheTimestamp = 0;
}
