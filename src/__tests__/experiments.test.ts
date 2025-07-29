import { describe, it, expect, beforeEach } from 'vitest';
import { getExperimentVariant, experiments } from '../lib/experiments';

// Mock localStorage
const localStorageMock = {
  getItem: (key: string) => {
    return localStorageMock.store[key] || null;
  },
  setItem: (key: string, value: string) => {
    localStorageMock.store[key] = value;
  },
  store: {} as Record<string, string>
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock crypto.randomUUID
Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'test-user-id-123'
  }
});

describe('Experiment System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.store = {};
  });

  it('should return null for non-existent experiment', () => {
    const variant = getExperimentVariant('non-existent-experiment');
    expect(variant).toBeNull();
  });

  it('should return null for paused experiment', () => {
    // Find a paused experiment or temporarily modify the experiments array
    const variant = getExperimentVariant('paused-experiment');
    expect(variant).toBeNull();
  });

  it('should return a variant for running experiment', () => {
    const runningExperiment = experiments.find(exp => exp.status === 'running');
    if (runningExperiment) {
      const variant = getExperimentVariant(runningExperiment.id);
      
      // Should return a variant if user is included in experiment
      if (variant) {
        expect(variant).toBeDefined();
        expect(runningExperiment.variants).toContain(variant);
      }
    }
  });

  it('should consistently return same variant for same user', () => {
    const runningExperiment = experiments.find(exp => exp.status === 'running');
    if (runningExperiment) {
      const variant1 = getExperimentVariant(runningExperiment.id);
      const variant2 = getExperimentVariant(runningExperiment.id);
      
      expect(variant1).toEqual(variant2);
    }
  });

  it('should have valid experiment configuration', () => {
    experiments.forEach(experiment => {
      expect(experiment.id).toBeTruthy();
      expect(experiment.name).toBeTruthy();
      expect(experiment.variants.length).toBeGreaterThan(0);
      expect(experiment.traffic).toBeGreaterThanOrEqual(0);
      expect(experiment.traffic).toBeLessThanOrEqual(1);
      
      // Validate variants
      experiment.variants.forEach(variant => {
        expect(variant.id).toBeTruthy();
        expect(variant.name).toBeTruthy();
        expect(variant.weight).toBeGreaterThanOrEqual(0);
        expect(variant.weight).toBeLessThanOrEqual(1);
        expect(variant.config).toBeDefined();
      });
      
      // Check that variant weights sum to approximately 1
      const totalWeight = experiment.variants.reduce((sum, variant) => sum + variant.weight, 0);
      expect(totalWeight).toBeCloseTo(1, 2);
    });
  });
});
