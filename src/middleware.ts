import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

// Types
interface EdgeExperiment {
  id: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic: number;
  variants: Array<{
    id: string;
    weight: number;
    config: Record<string, unknown>;
  }>;
}

// Simple hash function for consistent bucketing
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

// Get user ID from request (cookie or generate new one)
function getUserId(request: NextRequest): string {
  const existingUserId = request.cookies.get('experiment-user-id')?.value;
  if (existingUserId) {
    return existingUserId;
  }
  
  // Generate new user ID
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Assign user to experiment variant
function assignVariant(userId: string, experiment: EdgeExperiment) {
  // Check if user should be included in experiment
  const inclusionHash = hashString(`${userId}-${experiment.id}`);
  if (inclusionHash >= experiment.traffic) {
    return null; // User not included in experiment
  }
  
  // Assign to variant based on weights
  const variantHash = hashString(`${userId}-${experiment.id}-variant`);
  let cumulativeWeight = 0;
  
  for (const variant of experiment.variants) {
    cumulativeWeight += variant.weight;
    if (variantHash < cumulativeWeight) {
      return variant;
    }
  }
  
  // Fallback to first variant
  return experiment.variants[0] || null;
}

export async function middleware(request: NextRequest) {
  // Only run on main pages, not API routes or static files
  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    const response = NextResponse.next();
    const userId = getUserId(request);
    
    // Set user ID cookie if it doesn't exist
    if (!request.cookies.get('experiment-user-id')) {
      response.cookies.set('experiment-user-id', userId, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }

    // Get experiments from Edge Config
    let experiments: EdgeExperiment[] = [];
    
    try {
      const experimentsData = await get<EdgeExperiment[]>('experiments');
      if (experimentsData && Array.isArray(experimentsData)) {
        experiments = experimentsData;
      }
    } catch {
      // Edge Config not available - this is fine in development
      console.log('Edge Config not available in middleware, skipping experiment assignment');
    }
    
    if (experiments.length > 0) {
      // Process each running experiment
      for (const experiment of experiments) {
        if (experiment.status === 'running') {
          const variant = assignVariant(userId, experiment);
          
          if (variant) {
            // Set experiment assignment cookie
            response.cookies.set(`exp-${experiment.id}`, variant.id, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
            
            // Add experiment headers for debugging (development only)
            if (process.env.NODE_ENV === 'development') {
              response.headers.set(`x-experiment-${experiment.id}`, variant.id);
            }
          }
        }
      }
    }

    return response;
  } catch (error) {
    console.warn('Middleware experiment assignment failed:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
