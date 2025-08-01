'use client';

import { useState, useEffect, ReactNode } from 'react';

interface HydrationSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

/**
 * A wrapper specifically designed to prevent hydration mismatches
 * for components that access browser APIs (localStorage, window, etc.)
 */
export default function HydrationSafeWrapper({ 
  children, 
  fallback,
  className 
}: HydrationSafeWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This ensures the component is only rendered after hydration
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return fallback ? (
      <div className={className} suppressHydrationWarning>
        {fallback}
      </div>
    ) : (
      <div className={className} suppressHydrationWarning />
    );
  }

  return (
    <div className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
