'use client';

import { useState, useEffect } from 'react';
import { getExperimentVariant, trackExperimentExposure, type Variant } from '@/lib/experiments';

export function useExperiment(experimentId: string) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const experimentVariant = getExperimentVariant(experimentId);
    setVariant(experimentVariant);
    setIsLoading(false);

    // Track exposure if user is in experiment
    if (experimentVariant) {
      trackExperimentExposure(experimentId, experimentVariant.id);
    }
  }, [experimentId]);

  return {
    variant,
    isLoading,
    isInExperiment: variant !== null,
    config: variant?.config || {}
  };
}

// Helper hook for feature flags (simple on/off experiments)
export function useFeatureFlag(flagName: string, defaultValue = false) {
  const { variant, isLoading } = useExperiment(flagName);
  
  return {
    isEnabled: variant?.config?.enabled ?? defaultValue,
    isLoading,
    variant
  };
}

// Helper hook for A/B testing with fallback
export function useABTest<T>(experimentId: string, fallbackConfig: T): T & { variant?: Variant } {
  const { variant, config } = useExperiment(experimentId);
  
  return {
    ...fallbackConfig,
    ...config,
    variant
  } as T & { variant?: Variant };
}
