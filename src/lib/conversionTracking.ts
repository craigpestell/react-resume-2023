// Simple in-memory storage for conversion data
// In production, you'd want to use a database or external analytics service

interface ConversionEvent {
  id: string;
  experimentId: string;
  variantId: string;
  eventName: string;
  timestamp: number;
  data?: Record<string, unknown>;
  userId?: string;
}

interface ConversionMetrics {
  experimentId: string;
  variantId: string;
  variantName: string;
  exposures: number;
  conversions: number;
  conversionRate: number;
  events: { [eventName: string]: number };
}

// In-memory storage (replace with database in production)
const conversions: ConversionEvent[] = [];
const exposures: Set<string> = new Set(); // userId-experimentId-variantId combinations

export function trackConversion(event: ConversionEvent) {
  // Add to conversions array
  conversions.push({
    ...event,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  });

  // Keep only last 1000 events to prevent memory issues
  if (conversions.length > 1000) {
    conversions.splice(0, conversions.length - 1000);
  }
}

export function trackExposure(userId: string, experimentId: string, variantId: string) {
  const key = `${userId}-${experimentId}-${variantId}`;
  exposures.add(key);
}

export function getConversionMetrics(experimentId: string): ConversionMetrics[] {
  // Get all unique variants for this experiment
  const variantConversions = new Map<string, ConversionEvent[]>();
  const variantExposures = new Map<string, number>();

  // Group conversions by variant
  conversions
    .filter(c => c.experimentId === experimentId)
    .forEach(conversion => {
      if (!variantConversions.has(conversion.variantId)) {
        variantConversions.set(conversion.variantId, []);
      }
      variantConversions.get(conversion.variantId)!.push(conversion);
    });

  // Count exposures per variant
  Array.from(exposures).forEach(key => {
    const [, expId, variantId] = key.split('-');
    if (expId === experimentId) {
      variantExposures.set(variantId, (variantExposures.get(variantId) || 0) + 1);
    }
  });

  // Calculate metrics for each variant
  const metrics: ConversionMetrics[] = [];
  
  // Get all variants (both from conversions and exposures)
  const allVariants = new Set([
    ...variantConversions.keys(),
    ...variantExposures.keys()
  ]);

  allVariants.forEach(variantId => {
    const variantConversionList = variantConversions.get(variantId) || [];
    const exposureCount = variantExposures.get(variantId) || 0;
    const conversionCount = variantConversionList.length;

    // Count events by type
    const events: { [eventName: string]: number } = {};
    variantConversionList.forEach(conversion => {
      events[conversion.eventName] = (events[conversion.eventName] || 0) + 1;
    });

    metrics.push({
      experimentId,
      variantId,
      variantName: variantId.charAt(0).toUpperCase() + variantId.slice(1),
      exposures: exposureCount,
      conversions: conversionCount,
      conversionRate: exposureCount > 0 ? (conversionCount / exposureCount) * 100 : 0,
      events
    });
  });

  return metrics.sort((a, b) => a.variantId.localeCompare(b.variantId));
}

export function getAllConversionMetrics(): { [experimentId: string]: ConversionMetrics[] } {
  const experimentIds = new Set<string>();
  
  // Collect all experiment IDs
  conversions.forEach(c => experimentIds.add(c.experimentId));
  Array.from(exposures).forEach(key => {
    const [, expId] = key.split('-');
    experimentIds.add(expId);
  });

  const allMetrics: { [experimentId: string]: ConversionMetrics[] } = {};
  experimentIds.forEach(expId => {
    allMetrics[expId] = getConversionMetrics(expId);
  });

  return allMetrics;
}

export function clearAllData() {
  conversions.length = 0;
  exposures.clear();
}
