# Vercel Edge Config A/B Testing Setup

This guide shows you how to set up A/B testing using Vercel Edge Config for global, low-latency experiment configuration.

## 🎯 Benefits of Edge Config A/B Testing

- **Global Distribution**: Experiments served from Vercel's Edge Network
- **Zero Latency**: Configuration cached at the edge, no API calls
- **Real-time Updates**: Change experiments without deployments
- **Server-side Ready**: Works with SSR and middleware
- **Highly Available**: Built on Vercel's infrastructure

## 🚀 Quick Setup

### 1. Create Edge Config in Vercel Dashboard

1. Go to your Vercel dashboard
2. Navigate to Storage → Edge Config
3. Click "Create Edge Config"
4. Name it (e.g., "experiments")
5. Copy the connection string

### 2. Set Environment Variables

Add to your `.env.local`:

```bash
EDGE_CONFIG=edge-config://vercel.com/...your-connection-string
```

### 3. Configure Experiments

In your Edge Config, add experiments under the `experiments` key:

```json
{
  "experiments": [
    {
      "id": "hero-cta-test",
      "name": "Hero CTA Button Test",
      "status": "running",
      "traffic": 0.8,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "variants": [
        {
          "id": "control",
          "name": "Download Resume",
          "weight": 0.4,
          "config": {
            "ctaText": "Download Resume",
            "ctaStyle": "primary",
            "showSecondaryButton": false
          }
        },
        {
          "id": "variant-a",
          "name": "Get My Resume",
          "weight": 0.3,
          "config": {
            "ctaText": "Get My Resume",
            "ctaStyle": "gradient",
            "showSecondaryButton": true,
            "secondaryText": "View Online"
          }
        },
        {
          "id": "variant-b",
          "name": "Hire Me Now",
          "weight": 0.3,
          "config": {
            "ctaText": "Hire Me Now",
            "ctaStyle": "outline",
            "showSecondaryButton": true,
            "secondaryText": "Download Resume"
          }
        }
      ]
    },
    {
      "id": "theme-default-test",
      "name": "Default Theme Test",
      "status": "running",
      "traffic": 0.5,
      "variants": [
        {
          "id": "control",
          "name": "Default Light",
          "weight": 0.5,
          "config": {
            "defaultTheme": "default",
            "defaultDarkMode": false
          }
        },
        {
          "id": "variant-a",
          "name": "Cyberpunk Dark",
          "weight": 0.5,
          "config": {
            "defaultTheme": "cyberpunk",
            "defaultDarkMode": true
          }
        }
      ]
    }
  ]
}
```

### 4. Use in Components

```tsx
import { useEdgeABTest } from '@/hooks/useEdgeExperiment';
import { trackConversion } from '@/lib/edgeExperiments';

function MyComponent() {
  const config = useEdgeABTest('hero-cta-test', {
    ctaText: 'Default Text',
    ctaStyle: 'primary'
  });

  const handleClick = () => {
    trackConversion('button_click', { 
      variant: config.variant?.id,
      buttonText: config.ctaText 
    });
  };

  return (
    <button 
      className={getButtonStyles(config.ctaStyle)}
      onClick={handleClick}
    >
      {config.ctaText}
    </button>
  );
}
```

## 📊 How It Works

### User Bucketing Process

1. **Middleware Assignment**: Server-side user assignment using consistent hashing
2. **Cookie Storage**: Assignment stored in cookies for consistency
3. **Client Hydration**: React hooks read assignments and track exposure
4. **Analytics**: Events sent to your analytics service

### Data Flow

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Edge Config   │ -> │    Middleware    │ -> │   React Hook    │
│  (Experiments)  │    │  (Assignment)    │    │   (Tracking)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         v                       v                       v
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel Edge   │    │     Cookies      │    │   Analytics     │
│    Network      │    │  (Assignments)   │    │   Service       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔧 Configuration Options

### Experiment Object

```typescript
interface EdgeExperiment {
  id: string;                    // Unique experiment identifier
  name: string;                  // Human-readable name
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic: number;               // 0-1, percentage of users to include
  variants: EdgeVariant[];       // Array of test variants
  createdAt?: string;           // ISO timestamp
  updatedAt?: string;           // ISO timestamp
}
```

### Variant Object

```typescript
interface EdgeVariant {
  id: string;                    // Unique variant identifier
  name: string;                  // Human-readable name
  weight: number;                // 0-1, percentage within experiment
  config: Record<string, unknown>; // Configuration overrides
}
```

### Status Values

- `draft`: Experiment exists but is not running
- `running`: Experiment is active and assigning users
- `paused`: Experiment is temporarily stopped
- `completed`: Experiment has finished

## 📈 Analytics Integration

### Built-in Tracking

The system automatically tracks:
- **Experiment Exposures**: When users see experiment variants
- **Conversions**: When users perform tracked actions
- **User Context**: Device, location, and session data

### Supported Services

#### PostHog
```javascript
// Automatic tracking
posthog.capture('experiment_exposure', {
  experiment_id: 'hero-cta-test',
  variant_id: 'variant-a',
  $set: { experiment_user_id: userId }
});
```

#### Mixpanel
```javascript
mixpanel.track('Experiment Exposure', {
  experiment_id: 'hero-cta-test',
  variant_id: 'variant-a'
});
```

#### Google Analytics 4
```javascript
gtag('event', 'experiment_exposure', {
  experiment_id: 'hero-cta-test',
  variant_id: 'variant-a'
});
```

## 🛠️ Development vs Production

### Development Mode
- Shows experiment variant indicators
- Uses fallback experiments if Edge Config unavailable
- Console logging for debugging
- Local storage for quick testing

### Production Mode
- No visual indicators
- Always uses Edge Config
- Sends analytics to configured services
- Persistent cookie-based assignments

## 🎛️ Managing Experiments

### Via Vercel Dashboard
1. Go to Storage → Edge Config
2. Edit the JSON configuration
3. Click "Save" - changes are live immediately

### Via API (Advanced)
```javascript
const response = await fetch('https://api.vercel.com/v1/edge-config/your-config-id/items', {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    items: [
      {
        operation: 'update',
        key: 'experiments',
        value: updatedExperiments
      }
    ]
  })
});
```

## 📊 Best Practices

### Experiment Design
- **Clear Hypothesis**: Define what you're testing and why
- **Single Variable**: Test one thing at a time
- **Sufficient Sample Size**: Ensure statistical significance
- **Proper Duration**: Run for at least 1-2 weeks

### Configuration Management
- **Descriptive Names**: Use clear experiment and variant names
- **Weight Validation**: Ensure variant weights sum to 1.0
- **Traffic Control**: Start with lower traffic, increase gradually
- **Status Management**: Use draft → running → completed workflow

### Performance
- **Cache Strategy**: Edge Config is cached for 5 minutes
- **Fallback Ready**: Always provide default configurations
- **Lightweight**: Keep variant configs minimal
- **SSR Compatible**: Works with server-side rendering

## 🔍 Monitoring and Analysis

### Dashboard Features
- Real-time experiment status
- Variant assignment distribution
- Conversion tracking
- Statistical significance calculator

### Key Metrics
- **Exposure Rate**: Users seeing experiments
- **Conversion Rate**: Users completing goals
- **Statistical Significance**: Confidence in results
- **Practical Significance**: Business impact

## 🚨 Troubleshooting

### Common Issues

#### Edge Config Not Loading
```bash
# Check environment variable
echo $EDGE_CONFIG

# Verify connection string format
edge-config://vercel.com/team/project/config-id
```

#### Inconsistent Assignments
- Clear cookies and local storage
- Check that user ID generation is stable
- Verify middleware is running correctly

#### No Analytics Data
- Check API routes are accessible
- Verify analytics service credentials
- Monitor browser console for errors

### Debug Mode

Enable debug logging:
```typescript
// In development
localStorage.setItem('debug-experiments', 'true');
```

View experiment assignments:
```javascript
// Check cookies in browser
document.cookie.split(';').filter(c => c.includes('exp-'));

// Check local storage
JSON.parse(localStorage.getItem('experiment-exposures') || '{}');
```

## 🔄 Migration from Client-Side

If migrating from the client-side system:

1. **Keep Both Systems**: Run in parallel during transition
2. **Update Imports**: Change to `useEdgeExperiment` hooks
3. **Configure Edge Config**: Move experiments to Vercel
4. **Test Thoroughly**: Verify assignments are consistent
5. **Remove Old System**: Clean up after successful migration

## 📚 Resources

- [Vercel Edge Config Documentation](https://vercel.com/docs/storage/edge-config)
- [A/B Testing Best Practices](https://blog.vercel.com/ab-testing-best-practices)
- [Statistical Significance Calculator](https://blog.vercel.com/statistical-significance-calculator)

## 🆘 Support

For issues:
1. Check the dashboard at `/dashboard`
2. Review server logs in Vercel
3. Test with fallback experiments
4. Contact your team's analytics expert
