'use client';

import DarkThemeToggle from './DarkThemeToggle';
import ThemeColorSelector from './ThemeColorSelector';

interface ThemeChooserProps {
  className?: string;
  layout?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  darkToggleVariant?: 'default' | 'secondary' | 'ghost';
  darkToggleSize?: 'sm' | 'md' | 'lg';
}

export default function ThemeChooser({
  className = '',
  layout = 'horizontal',
  spacing = 'md',
  showLabels = false,
  darkToggleVariant = 'ghost',
  darkToggleSize = 'sm'
}: ThemeChooserProps) {
  const getSpacingClasses = () => {
    if (layout === 'vertical') {
      switch (spacing) {
        case 'sm': return 'space-y-2';
        case 'md': return 'space-y-4';
        case 'lg': return 'space-y-6';
        default: return 'space-y-4';
      }
    } else {
      switch (spacing) {
        case 'sm': return 'space-x-2';
        case 'md': return 'space-x-4';
        case 'lg': return 'space-x-6';
        default: return 'space-x-4';
      }
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'flex items-center';
    const layoutClasses = layout === 'vertical' ? 'flex-col' : 'flex-row';
    const spacingClasses = getSpacingClasses();
    
    return `${baseClasses} ${layoutClasses} ${spacingClasses} ${className}`;
  };

  return (
    <div className={getContainerClasses()}>
      {showLabels ? (
        <>
          <span className="text-sm text-muted-foreground">Mode:</span>
          <DarkThemeToggle 
            size={darkToggleSize} 
            variant={darkToggleVariant}
            showLabel={false}
          />
          <span className="text-sm text-muted-foreground">Theme:</span>
          <ThemeColorSelector />
        </>
      ) : (
        <>
          <DarkThemeToggle 
            size={darkToggleSize} 
            variant={darkToggleVariant}
            showLabel={false}
          />
          <ThemeColorSelector />
        </>
      )}
    </div>
  );
}
