'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface DarkThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'secondary' | 'ghost';
  showLabel?: boolean;
}

export default function DarkThemeToggle({ 
  className = '', 
  size = 'md',
  variant = 'secondary',
  showLabel = false 
}: DarkThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only set dark mode state if user has explicitly saved preferences
    // Otherwise, use the system preference
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    } else {
      // No saved preference, use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Listen for theme changes from other components
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'selected-dark-mode' && event.newValue !== null) {
        setIsDarkMode(event.newValue === 'true');
      }
    };

    // Listen for custom theme sync events (for same-tab changes)
    const handleThemeSync = (event: CustomEvent) => {
      const { darkMode } = event.detail;
      setIsDarkMode(darkMode);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('themeSync', handleThemeSync as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeSync', handleThemeSync as EventListener);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('selected-dark-mode', newDarkMode.toString());
    
    // Apply dark mode to current theme
    const currentTheme = localStorage.getItem('selected-theme') || 'nord';
    const html = document.documentElement;
    
    // Remove all theme attributes and classes first
    html.removeAttribute('data-theme');
    html.classList.remove('dark');
    
    // Apply the selected theme (always set data-theme for all themes)
    html.setAttribute('data-theme', currentTheme);
    
    // Apply dark mode
    if (newDarkMode) {
      html.classList.add('dark');
    }
    
    // Sync with other theme selectors
    window.dispatchEvent(new CustomEvent('themeSync', {
      detail: { theme: currentTheme, darkMode: newDarkMode }
    }));
    
    // Trigger storage event manually for same-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'selected-dark-mode',
      newValue: newDarkMode.toString(),
      storageArea: localStorage
    }));
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none';
    
    let sizeClasses = '';
    switch (size) {
      case 'sm':
        sizeClasses = showLabel ? 'px-2 py-1 text-sm' : 'p-1';
        break;
      case 'md':
        sizeClasses = showLabel ? 'px-3 py-2 text-sm' : 'p-2';
        break;
      case 'lg':
        sizeClasses = showLabel ? 'px-4 py-2 text-base' : 'p-3';
        break;
    }

    let variantClasses = '';
    switch (variant) {
      case 'default':
        variantClasses = 'bg-primary hover:bg-primary/90 text-primary-foreground';
        break;
      case 'secondary':
        variantClasses = 'bg-secondary hover:bg-secondary/80 text-secondary-foreground';
        break;
      case 'ghost':
        variantClasses = 'text-muted-foreground hover:text-foreground hover:bg-muted';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;
  };

  const getThemeIcon = () => {
    const iconClass = getIconSize();
    return isDarkMode ? <Sun className={iconClass} /> : <Moon className={iconClass} />;
  };

  const getThemeLabel = () => {
    return isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className={getButtonClasses()}
        aria-label="Loading theme toggle"
        disabled
        suppressHydrationWarning
      >
        <div className={getIconSize()} />
        {showLabel && (
          <span>Loading</span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={getButtonClasses()}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
      suppressHydrationWarning
    >
      {getThemeIcon()}
      {showLabel && (
        <span>{isDarkMode ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}
