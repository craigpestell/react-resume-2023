'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

/**
 * A wrapper component that only renders its children on the client side
 * after hydration is complete. This prevents hydration mismatches.
 */
export default function ClientOnlyWrapper({ 
  children, 
  fallback = null,
  className 
}: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback ? (
      <div className={className}>{fallback}</div>
    ) : null;
  }

  return <div className={className}>{children}</div>;
}
