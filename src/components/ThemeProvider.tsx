'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  selectedTheme: string;
  selectedFont: string;
  selectedSpacing: string;
  setDarkMode: (darkMode: boolean) => void;
  setTheme: (theme: string) => void;
  setFont: (font: string) => void;
  setSpacing: (spacing: string) => void;
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('nord');
  const [selectedFont, setSelectedFont] = useState('inconsolata');
  const [selectedSpacing, setSelectedSpacing] = useState('wide');

  useEffect(() => {
    // Load saved preferences only after hydration
    const savedDarkMode = localStorage.getItem('selected-dark-mode');
    const savedTheme = localStorage.getItem('selected-theme') || 'nord';
    const savedFont = localStorage.getItem('selected-font') || 'inconsolata';
    const savedSpacing = localStorage.getItem('selected-letter-spacing') || 'wide';

    // Set dark mode preference
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    } else {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }

    setSelectedTheme(savedTheme);
    setSelectedFont(savedFont);
    setSelectedSpacing(savedSpacing);

    // Apply initial settings
    const darkModeToApply = savedDarkMode !== null ? savedDarkMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme, darkModeToApply);
    applyFont(savedFont);
    applySpacing(savedSpacing);

    setIsHydrated(true);
  }, []);

  const applyTheme = (themeValue: string, darkMode: boolean) => {
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    html.classList.remove('dark');
    html.setAttribute('data-theme', themeValue);
    if (darkMode) {
      html.classList.add('dark');
    }
  };

  const applyFont = (fontValue: string) => {
    const body = document.body;
    // Remove all font classes
    const fontClasses = [
      'font-dmsans', 'font-firacode', 'font-sans', 'font-inconsolata',
      'font-inter', 'font-jetbrains', 'font-lato', 'font-montserrat',
      'font-nunito', 'font-opensans', 'font-outfit', 'font-plusjakarta',
      'font-poppins', 'font-roboto', 'font-sourcesans', 'font-spacemono',
      'font-ubuntu', 'font-worksans'
    ];
    fontClasses.forEach(cls => body.classList.remove(cls));
    
    // Add selected font class
    const fontClassMap: Record<string, string> = {
      dmsans: 'font-dmsans', 
      firacode: 'font-firacode', 
      geist: 'font-sans',
      inconsolata: 'font-inconsolata', 
      inter: 'font-inter', 
      jetbrains: 'font-jetbrains',
      lato: 'font-lato', 
      montserrat: 'font-montserrat', 
      nunito: 'font-nunito',
      opensans: 'font-opensans', 
      outfit: 'font-outfit', 
      plusjakarta: 'font-plusjakarta',
      poppins: 'font-poppins', 
      roboto: 'font-roboto', 
      sourcesans: 'font-sourcesans',
      spacemono: 'font-spacemono', 
      ubuntu: 'font-ubuntu', 
      worksans: 'font-worksans'
    };
    const fontClass = fontClassMap[fontValue];
    if (fontClass) {
      body.classList.add(fontClass);
    }
  };

  const applySpacing = (spacingValue: string) => {
    const body = document.body;
    const spacingClasses = ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest'];
    spacingClasses.forEach(cls => body.classList.remove(cls));
    
    const spacingClassMap: Record<string, string> = {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest'
    };
    const spacingClass = spacingClassMap[spacingValue];
    if (spacingClass) {
      body.classList.add(spacingClass);
    }
  };

  const setDarkMode = (darkMode: boolean) => {
    setIsDarkMode(darkMode);
    localStorage.setItem('selected-dark-mode', darkMode.toString());
    applyTheme(selectedTheme, darkMode);
  };

  const setTheme = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem('selected-theme', theme);
    applyTheme(theme, isDarkMode);
  };

  const setFont = (font: string) => {
    setSelectedFont(font);
    localStorage.setItem('selected-font', font);
    applyFont(font);
  };

  const setSpacing = (spacing: string) => {
    setSelectedSpacing(spacing);
    localStorage.setItem('selected-letter-spacing', spacing);
    applySpacing(spacing);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      selectedTheme,
      selectedFont,
      selectedSpacing,
      setDarkMode,
      setTheme,
      setFont,
      setSpacing,
      isHydrated
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
