'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';
import { useEdgeABTest } from '@/hooks/useEdgeExperiment';

const themeOptions = [
  { name: 'Default', value: 'default', preview: '#ffffff' },
  { name: 'Cyberpunk', value: 'cyberpunk', preview: '#ff00ff' },
  { name: 'Darkula', value: 'darkula', preview: '#6897bb' },
  { name: 'Dracula', value: 'dracula', preview: '#bd93f9' },
  { name: 'Forest', value: 'forest', preview: '#16a34a' },
  { name: 'Matrix', value: 'matrix', preview: '#00ff00' },
  { name: 'Midnight', value: 'midnight', preview: '#6366f1' },
  { name: 'Monokai', value: 'monokai', preview: '#66d9ef' },
  { name: 'Nord', value: 'nord', preview: '#5e81ac' },
  { name: 'Ocean', value: 'ocean', preview: '#0891b2' },
  { name: 'Purple', value: 'purple', preview: '#9333ea' },
  { name: 'Rose', value: 'rose', preview: '#e11d48' },
  { name: 'Sunset', value: 'sunset', preview: '#ea580c' },
];

export default function ThemeColorSelector() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Use experiment for default theme
  const { config: themeExperiment } = useEdgeABTest('theme-default-test', {
    defaultTheme: 'default',
    defaultDarkMode: true
  });

  useEffect(() => {
    // Load saved preferences or use experiment defaults
    const savedTheme = localStorage.getItem('selected-theme');
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    
    // Use experiment config if no saved preference
    const defaultTheme = savedTheme || (themeExperiment as { defaultTheme?: string })?.defaultTheme || 'default';
    const defaultDarkMode = savedDarkMode !== null 
      ? savedDarkMode === 'true' 
      : (themeExperiment as { defaultDarkMode?: boolean })?.defaultDarkMode ?? true;
    
    setSelectedTheme(defaultTheme);
    applyTheme(defaultTheme, defaultDarkMode);
  }, [themeExperiment]);

  useEffect(() => {
    // Listen for theme changes from other components
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'selected-theme' && event.newValue) {
        setSelectedTheme(event.newValue);
      }
    };

    // Listen for custom theme sync events (for same-tab changes)
    const handleThemeSync = (event: CustomEvent) => {
      const { theme } = event.detail;
      setSelectedTheme(theme);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('themeSync', handleThemeSync as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeSync', handleThemeSync as EventListener);
    };
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

  const applyTheme = (themeValue: string, darkMode: boolean) => {
    const html = document.documentElement;
    
    // Remove all theme attributes and classes
    html.removeAttribute('data-theme');
    html.classList.remove('dark');
    
    // Apply the selected theme (always set data-theme for all themes)
    html.setAttribute('data-theme', themeValue);
    
    // Apply dark mode
    if (darkMode) {
      html.classList.add('dark');
    }
  };

  const handleThemeChange = (themeValue: string) => {
    setSelectedTheme(themeValue);
    localStorage.setItem('selected-theme', themeValue);
    
    // Get current dark mode setting
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    const currentDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : true;
    
    applyTheme(themeValue, currentDarkMode);
    setIsOpen(false);
    
    // Sync with other theme selectors
    window.dispatchEvent(new CustomEvent('themeSync', {
      detail: { theme: themeValue, darkMode: currentDarkMode }
    }));
    
    // Trigger storage event manually for same-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'selected-theme',
      newValue: themeValue,
      storageArea: localStorage
    }));
  };

  const currentTheme = themeOptions.find(theme => theme.value === selectedTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label="Select theme"
      >
        <Palette className="w-4 h-4" />
        <span>{currentTheme?.name || 'Light'}</span>
      </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50">
            <div className="py-1">
              {themeOptions.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center space-x-3 ${
                    selectedTheme === theme.value
                      ? 'text-primary bg-primary/10'
                      : 'text-card-foreground'
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: theme.preview }}
                  />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
