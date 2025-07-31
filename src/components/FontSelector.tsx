'use client';

import { useState, useEffect, useRef } from 'react';
import { Type } from 'lucide-react';

const fontOptions = [
  { name: 'DM Sans', value: 'dmsans', className: 'font-dmsans' },
  { name: 'Fira Code', value: 'firacode', className: 'font-firacode' },
  { name: 'Geist', value: 'geist', className: 'font-sans' },
  { name: 'Inconsolata', value: 'inconsolata', className: 'font-inconsolata' },
  { name: 'Inter', value: 'inter', className: 'font-inter' },
  { name: 'JetBrains Mono', value: 'jetbrains', className: 'font-jetbrains' },
  { name: 'Lato', value: 'lato', className: 'font-lato' },
  { name: 'Montserrat', value: 'montserrat', className: 'font-montserrat' },
  { name: 'Nunito', value: 'nunito', className: 'font-nunito' },
  { name: 'Open Sans', value: 'opensans', className: 'font-opensans' },
  { name: 'Outfit', value: 'outfit', className: 'font-outfit' },
  { name: 'Plus Jakarta Sans', value: 'plusjakarta', className: 'font-plusjakarta' },
  { name: 'Poppins', value: 'poppins', className: 'font-poppins' },
  { name: 'Roboto', value: 'roboto', className: 'font-roboto' },
  { name: 'Source Sans 3', value: 'sourcesans', className: 'font-sourcesans' },
  { name: 'Space Mono', value: 'spacemono', className: 'font-spacemono' },
  { name: 'Ubuntu Mono', value: 'ubuntu', className: 'font-ubuntu' },
  { name: 'Work Sans', value: 'worksans', className: 'font-worksans' },
];

export default function FontSelector() {
  const [selectedFont, setSelectedFont] = useState('inconsolata');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved font preference
    const savedFont = localStorage.getItem('selected-font') || 'inconsolata';
    setSelectedFont(savedFont);
    applyFont(savedFont);
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

  const applyFont = (fontValue: string) => {
    const body = document.body;
    
    // Remove all font classes
    fontOptions.forEach(font => {
      body.classList.remove(font.className);
    });
    
    // Add the selected font class
    const selectedFontOption = fontOptions.find(font => font.value === fontValue);
    if (selectedFontOption) {
      body.classList.add(selectedFontOption.className);
    }
  };

  const handleFontChange = (fontValue: string) => {
    setSelectedFont(fontValue);
    localStorage.setItem('selected-font', fontValue);
    applyFont(fontValue);
    setIsOpen(false);
  };

  const currentFont = fontOptions.find(font => font.value === selectedFont);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label="Select font"
      >
        <Type className="w-4 h-4" />
        <span>{currentFont?.name || 'Inconsolata'}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px] z-50">
          <div className="py-1">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                onClick={() => handleFontChange(font.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  selectedFont === font.value
                    ? 'text-primary bg-primary/10'
                    : 'text-card-foreground'
                }`}
                style={{ fontFamily: getFontFamily(font.value) }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get the actual font family for preview
function getFontFamily(fontValue: string): string {
  const fontFamilies: Record<string, string> = {
    geist: 'ui-sans-serif, system-ui, sans-serif',
    inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
    roboto: 'Roboto, ui-sans-serif, system-ui, sans-serif',
    opensans: 'Open Sans, ui-sans-serif, system-ui, sans-serif',
    poppins: 'Poppins, ui-sans-serif, system-ui, sans-serif',
    montserrat: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
    sourcesans: 'Source Sans 3, ui-sans-serif, system-ui, sans-serif',
    nunito: 'Nunito, ui-sans-serif, system-ui, sans-serif',
    lato: 'Lato, ui-sans-serif, system-ui, sans-serif',
    worksans: 'Work Sans, ui-sans-serif, system-ui, sans-serif',
    dmsans: 'DM Sans, ui-sans-serif, system-ui, sans-serif',
    plusjakarta: 'Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif',
    outfit: 'Outfit, ui-sans-serif, system-ui, sans-serif',
    jetbrains: 'JetBrains Mono, ui-monospace, Menlo, Monaco, monospace',
    firacode: 'Fira Code, ui-monospace, Menlo, Monaco, monospace',
    ubuntu: 'Ubuntu Mono, ui-monospace, Menlo, Monaco, monospace',
    spacemono: 'Space Mono, ui-monospace, Menlo, Monaco, monospace',
    inconsolata: 'Inconsolata, ui-monospace, Menlo, Monaco, monospace',
  };
  
  return fontFamilies[fontValue] || 'ui-sans-serif, system-ui, sans-serif';
}
