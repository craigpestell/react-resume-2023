'use client';

import dynamic from 'next/dynamic';

// Lazy load specific motion components when needed
export const LazyMotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  {
    ssr: false,
  }
);

export const LazyMotionSection = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.section),
  {
    ssr: false,
  }
);

export const LazyMotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  {
    ssr: false,
  }
);

// Preload framer-motion for critical components
export const preloadFramerMotion = () => {
  if (typeof window !== 'undefined') {
    import('framer-motion');
  }
};
