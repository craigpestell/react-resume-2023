'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
  domContentLoaded?: number;
  loadComplete?: number;
}

/**
 * Performance monitoring component for measuring lazy loading effectiveness
 * Only renders in development mode
 */
export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      const newMetrics: PerformanceMetrics = {
        ttfb: navigation.responseStart - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      };

      // Get paint metrics
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          newMetrics.fcp = entry.startTime;
        }
      });

      // Get LCP if available
      if ('LargestContentfulPaint' in window) {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Get CLS if available
      if ('LayoutShift' in window) {
        let cls = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
            };
            if (!layoutShiftEntry.hadRecentInput) {
              cls += layoutShiftEntry.value || 0;
            }
          }
          setMetrics(prev => ({ ...prev, cls }));
        }).observe({ entryTypes: ['layout-shift'] });
      }

      setMetrics(newMetrics);
    };

    // Wait for page to load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Toggle visibility with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('load', measurePerformance);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg text-xs z-50 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-foreground">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>
      <div className="space-y-1 text-muted-foreground">
        {metrics.fcp && (
          <div>FCP: <span className="text-foreground">{Math.round(metrics.fcp)}ms</span></div>
        )}
        {metrics.lcp && (
          <div>LCP: <span className="text-foreground">{Math.round(metrics.lcp)}ms</span></div>
        )}
        {metrics.cls !== undefined && (
          <div>CLS: <span className="text-foreground">{metrics.cls.toFixed(3)}</span></div>
        )}
        {metrics.ttfb && (
          <div>TTFB: <span className="text-foreground">{Math.round(metrics.ttfb)}ms</span></div>
        )}
        {metrics.domContentLoaded && (
          <div>DCL: <span className="text-foreground">{Math.round(metrics.domContentLoaded)}ms</span></div>
        )}
        {metrics.loadComplete && (
          <div>Load: <span className="text-foreground">{Math.round(metrics.loadComplete)}ms</span></div>
        )}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
