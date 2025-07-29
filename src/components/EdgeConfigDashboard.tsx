'use client';

import { useState, useEffect } from 'react';
import { type EdgeExperiment } from '@/lib/edgeConfig';

interface ConversionStats {
  experimentId: string;
  variantId: string;
  totalViews: number;
  totalConversions: number;
  conversionRate: number;
  eventBreakdown: Record<string, number>;
}

interface ConversionEvent {
  experimentId: string;
  variantId: string;
  eventType: string;
  userId: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export default function EdgeConfigDashboard() {
  const [experiments, setExperiments] = useState<EdgeExperiment[]>([]);
  const [conversionStats, setConversionStats] = useState<ConversionStats[]>([]);
  const [conversionEvents, setConversionEvents] = useState<ConversionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showEvents, setShowEvents] = useState(false);

  const loadExperiments = async () => {
    setIsLoading(true);
    try {
      const [experimentsResponse, analyticsResponse] = await Promise.all([
        fetch('/api/experiments'),
        fetch('/api/analytics/track')
      ]);
      
      if (experimentsResponse.ok) {
        const data = await experimentsResponse.json();
        setExperiments(data.experiments || []);
      }
      
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setConversionStats(analyticsData.stats || []);
        setConversionEvents(analyticsData.events || []);
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load experiments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExperiments();
  }, []);

  const refreshExperiments = async () => {
    await loadExperiments();
  };

  const clearAnalytics = async () => {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      try {
        await fetch('/api/analytics/track', { method: 'DELETE' });
        await loadExperiments(); // Refresh the data
      } catch (error) {
        console.error('Failed to clear analytics:', error);
      }
    }
  };

  const getConversionStatsForVariant = (experimentId: string, variantId: string) => {
    return conversionStats.find(stat => 
      stat.experimentId === experimentId && stat.variantId === variantId
    );
  };

  const getExperimentStatus = (experiment: EdgeExperiment) => {
    switch (experiment.status) {
      case 'running':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Edge Config Experiments</h2>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshExperiments}
            disabled={isLoading}
            className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-md text-sm"
          >
            {isLoading ? 'Loading...' : 'Refresh from Edge Config'}
          </button>
          
          {conversionEvents.length > 0 && (
            <button
              onClick={clearAnalytics}
              className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md text-sm"
            >
              Clear Analytics
            </button>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {!isLoading && conversionEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-card-foreground">{conversionEvents.length}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-card-foreground">{conversionStats.length}</div>
            <div className="text-sm text-muted-foreground">Active Variants</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-card-foreground">
              {conversionStats.reduce((sum, stat) => sum + stat.totalConversions, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Conversions</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-card-foreground">
              {conversionStats.length > 0 
                ? ((conversionStats.reduce((sum, stat) => sum + stat.totalConversions, 0) / 
                    conversionStats.reduce((sum, stat) => sum + stat.totalViews, 0)) * 100).toFixed(1)
                : '0'}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Conversion Rate</div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {experiments.map(experiment => (
            <div key={experiment.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{experiment.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {experiment.id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getExperimentStatus(experiment)}`}>
                    {experiment.status}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Traffic: {(experiment.traffic * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {experiment.variants.map(variant => {
                  const stats = getConversionStatsForVariant(experiment.id, variant.id);
                  return (
                    <div
                      key={variant.id}
                      className="p-3 rounded border border-border bg-muted/50"
                    >
                      <h4 className="font-medium text-card-foreground">{variant.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Weight: {(variant.weight * 100).toFixed(0)}%
                      </p>
                      
                      {/* Conversion Statistics */}
                      {stats ? (
                        <div className="mt-2 p-2 bg-background rounded text-xs">
                          <div className="flex justify-between">
                            <span>Views:</span>
                            <span className="font-mono">{stats.totalViews}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conversions:</span>
                            <span className="font-mono">{stats.totalConversions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rate:</span>
                            <span className="font-mono font-semibold">
                              {(stats.conversionRate * 100).toFixed(1)}%
                            </span>
                          </div>
                          {Object.keys(stats.eventBreakdown).length > 0 && (
                            <div className="mt-1 pt-1 border-t border-border">
                              <div className="text-muted-foreground mb-1">Events:</div>
                              {Object.entries(stats.eventBreakdown).map(([event, count]) => (
                                <div key={event} className="flex justify-between">
                                  <span className="truncate">{event}:</span>
                                  <span className="font-mono">{count}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2 p-2 bg-background rounded text-xs text-muted-foreground">
                          No conversion data yet
                        </div>
                      )}
                      
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">Config:</div>
                        <pre className="text-xs bg-background p-2 rounded overflow-x-auto max-h-24 overflow-y-auto">
                          {JSON.stringify(variant.config, null, 2)}
                        </pre>
                      </div>
                    </div>
                  );
                })}
              </div>

              {experiment.createdAt && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Created: {new Date(experiment.createdAt).toLocaleString()}
                  {experiment.updatedAt && experiment.updatedAt !== experiment.createdAt && (
                    <span className="ml-4">
                      Updated: {new Date(experiment.updatedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {experiments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No experiments found in Edge Config</p>
              <p className="text-sm text-muted-foreground mt-2">
                Configure experiments in your Vercel Edge Config to see them here
              </p>
            </div>
          )}
        </div>
      )}

      {/* Events Section */}
      {conversionEvents.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Tracking Events</h3>
            <button
              onClick={() => setShowEvents(!showEvents)}
              className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded"
            >
              {showEvents ? 'Hide Events' : `Show Events (${conversionEvents.length})`}
            </button>
          </div>
          
          {showEvents && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {conversionEvents
                .sort((a, b) => b.timestamp - a.timestamp) // Most recent first
                .map((event, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded border border-border text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium text-card-foreground">{event.eventType}</span>
                        <span className="ml-2 text-muted-foreground">
                          {event.experimentId} → {event.variantId}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        User: {event.userId}
                      </span>
                      {event.data && Object.keys(event.data).length > 0 && (
                        <details className="text-xs">
                          <summary className="cursor-pointer text-primary hover:underline">
                            View Data
                          </summary>
                          <pre className="mt-1 p-2 bg-background rounded text-xs overflow-x-auto">
                            {JSON.stringify(event.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-card-foreground mb-2">Edge Config Setup</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>To set up experiments in Vercel Edge Config:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Create an Edge Config in your Vercel dashboard</li>
            <li>Add your experiments as a JSON array under the key &ldquo;experiments&rdquo;</li>
            <li>Set the EDGE_CONFIG environment variable in your project</li>
            <li>Deploy your changes to see experiments in action</li>
          </ol>
          <div className="mt-4 p-3 bg-background rounded border">
            <p className="text-xs font-medium mb-2">Example Edge Config JSON:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  "experiments": [
    {
      "id": "hero-cta-test",
      "name": "Hero CTA Button Test",
      "status": "running",
      "traffic": 0.8,
      "variants": [
        {
          "id": "control",
          "name": "Control",
          "weight": 0.5,
          "config": { "ctaText": "Download Resume" }
        },
        {
          "id": "variant-a",
          "name": "Variant A",
          "weight": 0.5,
          "config": { "ctaText": "Get My Resume" }
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
