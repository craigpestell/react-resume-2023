'use client';

import { useState, useEffect } from 'react';
import { experiments } from '@/lib/experiments';

interface ExposureData {
  [experimentId: string]: {
    variantId: string;
    timestamp: number;
    userId: string;
  };
}

interface ConversionData {
  eventName: string;
  data?: Record<string, unknown>;
  timestamp: number;
  userId: string;
  experiments: ExposureData;
}

export default function ExperimentDashboard() {
  const [exposures, setExposures] = useState<ExposureData>({});
  const [conversions, setConversions] = useState<ConversionData[]>([]);

  useEffect(() => {
    const loadData = () => {
      const exposureData = JSON.parse(localStorage.getItem('experiment-exposures') || '{}');
      const conversionData = JSON.parse(localStorage.getItem('experiment-conversions') || '[]');
      setExposures(exposureData);
      setConversions(conversionData);
    };

    loadData();
    
    // Refresh data every 10 seconds
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getExperimentStats = (experimentId: string) => {
    const experiment = experiments.find(exp => exp.id === experimentId);
    if (!experiment) return null;

    const userExposure = exposures[experimentId];
    const userConversions = conversions.filter(conv => 
      conv.experiments[experimentId]?.variantId === userExposure?.variantId
    );

    const variantStats = experiment.variants.map(variant => {
      const variantConversions = conversions.filter(conv => 
        conv.experiments[experimentId]?.variantId === variant.id
      );

      return {
        ...variant,
        conversions: variantConversions.length,
        conversionRate: variantConversions.length > 0 ? 100 : 0 // Simplified for demo
      };
    });

    return {
      experiment,
      userVariant: userExposure?.variantId,
      userConversions: userConversions.length,
      variantStats
    };
  };

  const clearData = () => {
    localStorage.removeItem('experiment-exposures');
    localStorage.removeItem('experiment-conversions');
    localStorage.removeItem('experiment-user-id');
    setExposures({});
    setConversions([]);
    window.location.reload(); // Refresh to reset experiments
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-card-foreground">Experiment Dashboard</h2>
        <button
          onClick={clearData}
          className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md text-sm"
        >
          Clear Data & Reset
        </button>
      </div>

      <div className="space-y-6">
        {experiments.map(experiment => {
          const stats = getExperimentStats(experiment.id);
          if (!stats) return null;

          return (
            <div key={experiment.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{experiment.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className={`px-2 py-1 rounded text-xs ${
                      experiment.status === 'running' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      experiment.status === 'paused' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {experiment.status}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Traffic: {(experiment.traffic * 100).toFixed(0)}%</p>
                  {stats.userVariant && (
                    <p className="text-sm font-medium text-primary">
                      Your variant: {stats.userVariant}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.variantStats.map(variant => (
                  <div
                    key={variant.id}
                    className={`p-3 rounded border ${
                      variant.id === stats.userVariant 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-muted/50'
                    }`}
                  >
                    <h4 className="font-medium text-card-foreground">{variant.name}</h4>
                    <p className="text-sm text-muted-foreground">Weight: {(variant.weight * 100).toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">Conversions: {variant.conversions}</p>
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground mb-1">Config:</div>
                      <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                        {JSON.stringify(variant.config, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {conversions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Conversions</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {conversions.slice(-10).reverse().map((conversion, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                <span className="font-medium">{conversion.eventName}</span>
                <span className="text-muted-foreground">
                  {new Date(conversion.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-card-foreground mb-2">How to Use</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Experiments are automatically assigned when you visit the site</li>
          <li>• Interact with elements to generate conversion events</li>
          <li>• Data is stored locally for demo purposes</li>
          <li>• In production, this would connect to your analytics service</li>
          <li>• Use &ldquo;Clear Data &amp; Reset&rdquo; to get a new variant assignment</li>
        </ul>
      </div>
    </div>
  );
}
