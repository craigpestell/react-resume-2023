'use client';

import { useState, useEffect } from 'react';
import { getExperimentVariant, trackConversion, type EdgeVariant } from '@/lib/edgeConfig';

export interface UseExperimentResult {
  variant: EdgeVariant | null;
  variantId: string | null;
  isLoading: boolean;
  trackConversion: (eventName?: string, data?: Record<string, unknown>) => void;
}

export function useEdgeExperiment(experimentId: string): UseExperimentResult {
  const [variant, setVariant] = useState<EdgeVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadExperiment() {
      try {
        const experimentVariant = await getExperimentVariant(experimentId);
        
        if (mounted) {
          setVariant(experimentVariant);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn(`Failed to load experiment ${experimentId}:`, error);
        if (mounted) {
          setVariant(null);
          setIsLoading(false);
        }
      }
    }

    loadExperiment();

    return () => {
      mounted = false;
    };
  }, [experimentId]);

  const handleTrackConversion = (eventName?: string, data?: Record<string, unknown>) => {
    const event = eventName || `conversion_${experimentId}`;
    const conversionData = {
      experimentId,
      variantId: variant?.id || 'control',
      ...data
    };
    trackConversion(event, conversionData);
  };

  return {
    variant,
    variantId: variant?.id || null,
    isLoading,
    trackConversion: handleTrackConversion
  };
}

// Helper hook for A/B testing with simple config
export function useEdgeABTest(experimentId: string, fallbackConfig: Record<string, unknown> = {}) {
  const { variant, variantId, isLoading, trackConversion } = useEdgeExperiment(experimentId);
  
  return {
    variant,
    variantId,
    isLoading,
    trackConversion,
    config: variant?.config || fallbackConfig
  };
}

// Helper hook for feature flags (simple on/off experiments)
export function useEdgeFeatureFlag(flagName: string, defaultValue = false) {
  const { variant, variantId, isLoading, trackConversion } = useEdgeExperiment(flagName);
  
  return {
    isEnabled: variantId === 'enabled' || variant?.config?.enabled === true || defaultValue,
    isLoading,
    variant,
    variantId,
    trackConversion
  };
}

// Compatibility hooks (use the Edge Config versions)
export const useExperiment = useEdgeExperiment;
export const useABTest = useEdgeABTest;
export const useFeatureFlag = useEdgeFeatureFlag;
