'use client';

import { useState, useEffect, useRef } from 'react';
import { Type } from 'lucide-react';

const letterSpacingOptions = [
  { name: 'Tighter', value: 'tighter', className: 'tracking-tighter', style: '-0.05em' },
  { name: 'Tight', value: 'tight', className: 'tracking-tight', style: '-0.025em' },
  { name: 'Normal', value: 'normal', className: 'tracking-normal', style: '0em' },
  { name: 'Wide', value: 'wide', className: 'tracking-wide', style: '0.025em' },
  { name: 'Wider', value: 'wider', className: 'tracking-wider', style: '0.05em' },
  { name: 'Widest', value: 'widest', className: 'tracking-widest', style: '0.1em' },
];

export default function LetterSpacingSelector() {
  const [selectedSpacing, setSelectedSpacing] = useState('wide');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load saved letter spacing preference
    const savedSpacing = localStorage.getItem('selected-letter-spacing') || 'wide';
    setSelectedSpacing(savedSpacing);
    applyLetterSpacing(savedSpacing);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyLetterSpacing = (spacingValue: string) => {
    const body = document.body;
    
    // Remove all letter spacing classes
    letterSpacingOptions.forEach(spacing => {
      body.classList.remove(spacing.className);
    });
    
    // Add the selected letter spacing class
    const selectedSpacingOption = letterSpacingOptions.find(spacing => spacing.value === spacingValue);
    if (selectedSpacingOption) {
      body.classList.add(selectedSpacingOption.className);
    }
  };

  const handleSpacingChange = (spacingValue: string) => {
    setSelectedSpacing(spacingValue);
    localStorage.setItem('selected-letter-spacing', spacingValue);
    applyLetterSpacing(spacingValue);
    setIsOpen(false);
  };

  const currentSpacing = letterSpacingOptions.find(spacing => spacing.value === selectedSpacing);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground transition-colors rounded-md"
          disabled
          aria-label="Loading letter spacing selector"
          suppressHydrationWarning
        >
          <Type className="w-4 h-4" />
          <span>Loading...</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef} suppressHydrationWarning>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label="Adjust letter spacing"
        suppressHydrationWarning
      >
        <Type className="w-4 h-4" />
        <span>{currentSpacing?.name || 'normal'}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
          <div className="py-1">
            {letterSpacingOptions.map((spacing) => (
              <button
                key={spacing.value}
                onClick={() => handleSpacingChange(spacing.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  selectedSpacing === spacing.value
                    ? 'text-primary bg-primary/10'
                    : 'text-card-foreground'
                }`}
                style={{ letterSpacing: spacing.style }}
              >
                {spacing.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
