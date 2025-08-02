'use client';

import { useState, useEffect, ReactNode, Fragment } from 'react';

interface HydrationSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  as?: 'div' | 'fragment';
}

/**
 * A wrapper specifically designed to prevent hydration mismatches
 * for components that access browser APIs (localStorage, window, etc.)
 * Optimized to minimize DOM elements by using fragments when possible
 */
export default function HydrationSafeWrapper({ 
  children, 
  fallback,
  className,
  as = 'div'
}: HydrationSafeWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This ensures the component is only rendered after hydration
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    if (fallback) {
      return as === 'fragment' ? (
        <Fragment>{fallback}</Fragment>
      ) : (
        <div className={className} suppressHydrationWarning>
          {fallback}
        </div>
      );
    }
    return as === 'fragment' ? null : <div className={className} suppressHydrationWarning />;
  }

  return as === 'fragment' ? (
    <>{children}</>
  ) : (
    <div className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
