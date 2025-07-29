import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export interface EdgeExperiment {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic: number; // 0-1
  variants: EdgeVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EdgeVariant {
  id: string;
  name: string;
  weight: number; // 0-1
  config: Record<string, unknown>;
}

// Fallback experiments for development/when Edge Config is unavailable
const FALLBACK_EXPERIMENTS: EdgeExperiment[] = [
  {
    id: 'hero-cta-test',
    name: 'Hero CTA Button Test',
    status: 'running',
    traffic: 0.8,
    variants: [
      {
        id: 'control',
        name: 'Download Resume',
        weight: 0.5,
        config: {
          ctaText: 'Download Resume',
          ctaStyle: 'primary',
          showSecondaryButton: false
        }
      },
      {
        id: 'variant-a',
        name: 'Get My Resume',
        weight: 0.5,
        config: {
          ctaText: 'Get My Resume',
          ctaStyle: 'gradient',
          showSecondaryButton: true,
          secondaryText: 'View Online'
        }
      }
    ]
  },
  {
    id: 'theme-default-test',
    name: 'Default Theme Test',
    status: 'running',
    traffic: 0.5,
    variants: [
      {
        id: 'control',
        name: 'Default Light',
        weight: 0.5,
        config: {
          defaultTheme: 'default',
          defaultDarkMode: false
        }
      },
      {
        id: 'variant-a',
        name: 'Cyberpunk Dark',
        weight: 0.5,
        config: {
          defaultTheme: 'cyberpunk',
          defaultDarkMode: true
        }
      }
    ]
  }
];

export async function GET() {
  try {
    // Try to get experiments from Edge Config
    const experiments = await get<EdgeExperiment[]>('experiments');
    
    if (experiments && Array.isArray(experiments)) {
      return NextResponse.json({
        success: true,
        source: 'edge-config',
        experiments
      });
    }
  } catch (error) {
    console.warn('Edge Config not available:', error);
  }

  // Return fallback experiments
  return NextResponse.json({
    success: true,
    source: 'fallback',
    experiments: FALLBACK_EXPERIMENTS
  });
}
