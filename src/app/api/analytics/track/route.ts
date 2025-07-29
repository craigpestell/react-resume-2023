import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsStorage, type ConversionEvent } from '@/lib/analyticsStorage';

export interface ConversionStats {
  experimentId: string;
  variantId: string;
  totalViews: number;
  totalConversions: number;
  conversionRate: number;
  eventBreakdown: Record<string, number>;
}

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json();
    
    // Log for development
    console.log('Analytics event:', event, data);
    
    // Extract experiment data from the analytics payload
    const { experimentId, variantId, ...eventData } = data || {};
    
    if (!experimentId || !variantId) {
      console.log('Non-experiment event tracked:', event, data);
      return NextResponse.json({ success: true });
    }

    // Create conversion event
    const conversionEvent: ConversionEvent = {
      experimentId,
      variantId,
      eventType: event,
      userId: request.headers.get('x-user-id') || `user-${Date.now()}`,
      timestamp: Date.now(),
      data: eventData
    };

    // Store conversion data persistently
    await AnalyticsStorage.addEvent(conversionEvent);
    
    console.log('Conversion tracked and saved:', conversionEvent);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Conversion tracked and saved',
      event: conversionEvent 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get events from persistent storage
    const conversionEvents = await AnalyticsStorage.getEvents();
    
    // Calculate stats by experiment and variant
    const stats: Record<string, ConversionStats> = {};
    
    conversionEvents.forEach((event: ConversionEvent) => {
      const key = `${event.experimentId}-${event.variantId}`;
      
      if (!stats[key]) {
        stats[key] = {
          experimentId: event.experimentId,
          variantId: event.variantId,
          totalViews: 0,
          totalConversions: 0,
          conversionRate: 0,
          eventBreakdown: {}
        };
      }
      
      // Count views (any event is a view/exposure)
      stats[key].totalViews++;
      
      // Count conversions (specific events)
      if (event.eventType.includes('conversion') || 
          event.eventType.includes('download') || 
          event.eventType.includes('contact') ||
          event.eventType.includes('resume')) {
        stats[key].totalConversions++;
      }
      
      // Track event breakdown
      stats[key].eventBreakdown[event.eventType] = 
        (stats[key].eventBreakdown[event.eventType] || 0) + 1;
    });
    
    // Calculate conversion rates
    Object.values(stats).forEach((stat: ConversionStats) => {
      stat.conversionRate = stat.totalViews > 0 
        ? stat.totalConversions / stat.totalViews 
        : 0;
    });
    
    return NextResponse.json({
      success: true,
      events: conversionEvents,
      stats: Object.values(stats),
      totalEvents: conversionEvents.length
    });
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return NextResponse.json({ 
      error: 'Failed to get analytics data',
      events: [],
      stats: [],
      totalEvents: 0
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await AnalyticsStorage.clearEvents();
    return NextResponse.json({ 
      success: true, 
      message: 'All analytics data cleared' 
    });
  } catch (error) {
    console.error('Failed to clear analytics:', error);
    return NextResponse.json({ 
      error: 'Failed to clear analytics data' 
    }, { status: 500 });
  }
}
