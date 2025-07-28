'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';

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

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('selected-theme') || 'default';
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    const defaultDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : true;
    setSelectedTheme(savedTheme);
    setIsDarkMode(defaultDarkMode);
    applyTheme(savedTheme, defaultDarkMode);
  }, []);

  useEffect(() => {
    // Listen for theme changes from other components
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'selected-theme' && event.newValue) {
        setSelectedTheme(event.newValue);
      }
      if (event.key === 'selected-dark-mode' && event.newValue !== null) {
        setIsDarkMode(event.newValue === 'true');
      }
    };

    // Listen for custom theme sync events (for same-tab changes)
    const handleThemeSync = (event: CustomEvent) => {
      const { theme, darkMode } = event.detail;
      setSelectedTheme(theme);
      setIsDarkMode(darkMode);
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
    applyTheme(themeValue, isDarkMode);
    setIsOpen(false);
    
    // Sync with other theme selectors
    window.dispatchEvent(new CustomEvent('themeSync', {
      detail: { theme: themeValue, darkMode: isDarkMode }
    }));
    
    // Trigger storage event manually for same-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'selected-theme',
      newValue: themeValue,
      storageArea: localStorage
    }));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('selected-dark-mode', newDarkMode.toString());
    applyTheme(selectedTheme, newDarkMode);
    
    // Sync with other theme selectors
    window.dispatchEvent(new CustomEvent('themeSync', {
      detail: { theme: selectedTheme, darkMode: newDarkMode }
    }));
    
    // Trigger storage event manually for same-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'selected-dark-mode',
      newValue: newDarkMode.toString(),
      storageArea: localStorage
    }));
  };

  const currentTheme = themeOptions.find(theme => theme.value === selectedTheme);

  return (
    <div className="flex items-center space-x-2">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      
      {/* Theme selector */}
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
    </div>
  );
}
