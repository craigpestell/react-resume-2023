'use client';

import { useState, useEffect } from 'react';
import { Download, Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onDownloadResume: () => void;
}

export default function Header({ onDownloadResume }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    const defaultDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : true;
    setIsDarkMode(defaultDarkMode);
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
    const currentTheme = localStorage.getItem('selected-theme') || 'default';
    const html = document.documentElement;
    
    if (newDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Always maintain the current theme
    html.setAttribute('data-theme', currentTheme);
    
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

  const getThemeIcon = () => {
    return isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
  };

  const getThemeLabel = () => {
    return isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-sm shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-xl text-primary">
            Portfolio
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label={getThemeLabel()}
              title={getThemeLabel()}
            >
              {getThemeIcon()}
            </button>

            {/* Download Resume Button - Full text for larger screens */}
            <button
              onClick={onDownloadResume}
              className="hidden xl:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            {/* Resume Button - Short text for medium screens */}
            <button
              onClick={onDownloadResume}
              className="hidden md:flex xl:hidden items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onDownloadResume}
                className="flex items-center space-x-2 w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors mx-4 mt-4"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
