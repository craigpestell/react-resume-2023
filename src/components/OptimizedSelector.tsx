'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  className?: string;
  style?: string;
}

interface OptimizedSelectorProps {
  type: 'font' | 'spacing';
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}

/**
 * Optimized selector component that reduces DOM elements
 * by sharing common patterns between font and spacing selectors
 */
export default function OptimizedSelector({
  type,
  options,
  value,
  onChange,
  icon,
  placeholder = 'Select...'
}: OptimizedSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find(option => option.value === value);

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground rounded-md"
        disabled
        suppressHydrationWarning
      >
        {icon}
        <span>Loading...</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef} suppressHydrationWarning>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label={`Select ${type}`}
        suppressHydrationWarning
      >
        {icon}
        <span>{currentOption?.label || placeholder}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  value === option.value
                    ? 'text-primary bg-primary/10'
                    : 'text-card-foreground'
                }`}
                style={option.style ? { letterSpacing: option.style } : undefined}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
