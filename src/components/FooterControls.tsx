'use client';

import FontSelector from './FontSelector';
import LetterSpacingSelector from './LetterSpacingSelector';
import ThemeChooser from './ThemeChooser';
import HydrationSafeWrapper from './HydrationSafeWrapper';

/**
 * Optimized footer controls component that minimizes DOM elements
 * by using efficient layout patterns and removing unnecessary wrapper divs
 */
export default function FooterControls() {
  return (
    <HydrationSafeWrapper as="fragment">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <ThemeChooser 
          showLabels={true}
          spacing="sm"
          darkToggleVariant="ghost"
          darkToggleSize="sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Font:</span>
          <FontSelector />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Spacing:</span>
          <LetterSpacingSelector />
        </div>
      </div>
    </HydrationSafeWrapper>
  );
}
