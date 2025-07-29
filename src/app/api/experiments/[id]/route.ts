import { NextRequest, NextResponse } from 'next/server';
import type { EdgeExperiment } from '../route';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Fetch all experiments from our main API
    const experimentsResponse = await fetch(
      new URL('/api/experiments', request.url).toString(),
      { cache: 'no-store' }
    );
    
    if (!experimentsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch experiments' },
        { status: 500 }
      );
    }
    
    const data = await experimentsResponse.json();
    const experiment = data.experiments.find((exp: EdgeExperiment) => exp.id === id);
    
    if (!experiment) {
      return NextResponse.json(
        { error: 'Experiment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      experiment,
      source: data.source
    });
  } catch (error) {
    console.error('Error fetching experiment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
