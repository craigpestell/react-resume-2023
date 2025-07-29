# Multivariate Testing Implementation

This project implements a comprehensive multivariate testing (A/B testing) system built specifically for Next.js applications. The system is designed to be lightweight, type-safe, and easy to use.

## Features

- 🎯 **Client-side A/B Testing**: Consistent user bucketing across sessions
- 📊 **Real-time Analytics**: Track exposures and conversions
- 🎨 **Component-level Testing**: Test different UI variants
- 🔄 **Theme Testing**: Test different default themes and settings
- 📱 **Responsive Design**: Dashboard works on all screen sizes
- 🛡️ **Type Safety**: Full TypeScript support
- 🎛️ **Feature Flags**: Simple on/off feature toggles

## Quick Start

### 1. Define an Experiment

Add your experiment to `src/lib/experiments.ts`:

```typescript
{
  id: 'button-color-test',
  name: 'Button Color Test',
  variants: [
    {
      id: 'control',
      name: 'Blue Button',
      weight: 0.5,
      config: { buttonColor: 'blue' }
    },
    {
      id: 'variant-a',
      name: 'Green Button',
      weight: 0.5,
      config: { buttonColor: 'green' }
    }
  ],
  traffic: 0.8, // 80% of users
  status: 'running'
}
```

### 2. Use in Components

```tsx
import { useABTest } from '@/hooks/useExperiment';

function MyButton() {
  const config = useABTest('button-color-test', { buttonColor: 'blue' });
  
  return (
    <button className={`btn btn-${config.buttonColor}`}>
      Click me!
    </button>
  );
}
```

### 3. Track Conversions

```tsx
import { trackConversion } from '@/lib/experiments';

function handleClick() {
  trackConversion('button_click', { variant: config.variant?.id });
}
```

## API Reference

### Core Functions

#### `getExperimentVariant(experimentId: string)`
Returns the variant assignment for a user, or null if not in experiment.

#### `trackExperimentExposure(experimentId: string, variantId: string)`
Records that a user has been exposed to an experiment variant.

#### `trackConversion(eventName: string, data?: Record<string, unknown>)`
Records a conversion event with associated experiment data.

### React Hooks

#### `useExperiment(experimentId: string)`
Returns experiment state and configuration.

```tsx
const { variant, isLoading, isInExperiment, config } = useExperiment('my-test');
```

#### `useABTest<T>(experimentId: string, fallbackConfig: T)`
Returns merged configuration with experiment overrides.

```tsx
const config = useABTest('my-test', { color: 'blue', size: 'medium' });
```

#### `useFeatureFlag(flagName: string, defaultValue?: boolean)`
Simple feature flag implementation.

```tsx
const { isEnabled } = useFeatureFlag('new-feature', false);
```

## Experiment Configuration

### Experiment Object

```typescript
interface Experiment {
  id: string;           // Unique identifier
  name: string;         // Human-readable name
  variants: Variant[];  // Array of test variants
  traffic: number;      // 0-1, percentage of users to include
  status: 'draft' | 'running' | 'paused' | 'completed';
}
```

### Variant Object

```typescript
interface Variant {
  id: string;           // Unique identifier within experiment
  name: string;         // Human-readable name
  weight: number;       // 0-1, percentage of experiment users
  config: Record<string, unknown>; // Configuration overrides
}
```

## Best Practices

### 1. Experiment Design
- Start with a clear hypothesis
- Define success metrics before testing
- Ensure sufficient sample size
- Test one variable at a time (unless specifically doing multivariate)

### 2. Implementation
- Always provide fallback configurations
- Use semantic event names for conversions
- Include experiment metadata in analytics
- Test experiments thoroughly before going live

### 3. Statistical Significance
- Run experiments for at least 1-2 weeks
- Wait for statistical significance before making decisions
- Consider practical significance, not just statistical
- Use the built-in significance calculator

```typescript
import { calculateSignificance } from '@/lib/experimentUtils';

const result = calculateSignificance(
  controlConversions, controlSample,
  variantConversions, variantSample
);

console.log(`Significant: ${result.significant}, P-value: ${result.pValue}`);
```

## Analytics Integration

The system supports multiple analytics providers:

### Google Analytics 4
```javascript
gtag('event', 'experiment_exposure', {
  experiment_id: 'my-test',
  variant_id: 'variant-a'
});
```

### Mixpanel
```javascript
mixpanel.track('Experiment Exposure', {
  experiment_id: 'my-test',
  variant_id: 'variant-a'
});
```

### PostHog
```javascript
posthog.capture('experiment_exposure', {
  experiment_id: 'my-test',
  variant_id: 'variant-a'
});
```

## Dashboard

Access the experiment dashboard at `/dashboard` to:
- View active experiments
- Monitor conversion rates
- See your current variant assignments
- Clear data and reset experiments

## Development vs Production

### Development
- Shows experiment variant indicators
- Stores data in localStorage
- Console logging for debugging
- Reset functionality available

### Production
- No visual experiment indicators
- Sends data to analytics services
- Proper error handling
- Persistent user bucketing

## Common Patterns

### Hero Section CTA Testing
```tsx
const ctaConfig = useABTest('hero-cta-test', {
  ctaText: 'Download Resume',
  ctaStyle: 'primary',
  showSecondaryButton: false
});
```

### Theme Default Testing
```tsx
const themeConfig = useABTest('theme-default-test', {
  defaultTheme: 'default',
  defaultDarkMode: true
});
```

### Feature Flag Testing
```tsx
const { isEnabled } = useFeatureFlag('new-feature');

return (
  <div>
    {isEnabled && <NewFeatureComponent />}
    <ExistingComponent />
  </div>
);
```

## Troubleshooting

### Common Issues

1. **Experiments not working**: Check that experiment status is 'running'
2. **Inconsistent variants**: Ensure user ID generation is stable
3. **No conversions tracked**: Verify trackConversion calls are in place
4. **TypeScript errors**: Use proper type definitions from experimentUtils

### Debug Mode

Set `NODE_ENV=development` to enable:
- Experiment variant indicators
- Console logging
- Local data storage
- Dashboard reset functionality

## Migration Guide

### From Other A/B Testing Tools

1. Export your existing experiment configurations
2. Convert to our experiment format
3. Update component code to use our hooks
4. Set up analytics integration
5. Test thoroughly before deploying

## Performance Considerations

- Experiments run client-side only (no SSR impact)
- Minimal JavaScript bundle size (~2KB gzipped)
- Local storage for fast user bucketing
- Debounced analytics calls
- No external dependencies required

## Security

- No sensitive data in experiment configs
- User IDs are anonymized UUIDs
- Local data storage only (no server transmission)
- GDPR/CCPA compliant design
- No cookies used by default
