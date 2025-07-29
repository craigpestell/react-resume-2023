#!/usr/bin/env node

/**
 * Contrast ratio checker for theme colors
 * Calculates WCAG contrast ratios and suggests improvements
 */

// Convert hex color to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Check if contrast meets WCAG standards
function checkContrast(ratio) {
  return {
    AA_normal: ratio >= 4.5,
    AA_large: ratio >= 3,
    AAA_normal: ratio >= 7,
    AAA_large: ratio >= 4.5
  };
}

// Suggest improved colors with specific fixes
function getColorFix(bgColor, fgColor, colorName) {
  const fixes = {
    // Light theme fixes
    'warning': {
      light: { bg: '#d97706', fg: '#ffffff' }, // Darker orange
      dark: '#fbbf24' // Keep current dark theme
    },
    'info': {
      light: { bg: '#0284c7', fg: '#ffffff' }, // Darker blue
      dark: '#38bdf8' // Keep current dark theme
    },
    'success': {
      light: { bg: '#059669', fg: '#ffffff' }, // Darker green
      dark: { bg: '#16a34a', fg: '#ffffff' } // Darker green for dark theme
    },
    'accent': {
      light: { bg: '#2563eb', fg: '#ffffff' }, // Darker blue (same as primary)
      dark: '#60a5fa' // Keep current
    },
    'primary': {
      light: '#2563eb', // Keep current
      dark: { bg: '#2563eb', fg: '#ffffff' } // Darker blue for dark theme
    },
    'destructive': {
      light: '#dc2626', // Keep current
      dark: { bg: '#dc2626', fg: '#ffffff' } // Darker red for dark theme
    }
  };
  
  return fixes[colorName] || null;
}

// Theme color definitions
const defaultTheme = {
  light: {
    background: '#ffffff',
    foreground: '#1a1a1a',
    primary: '#2563eb',
    'primary-foreground': '#ffffff',
    secondary: '#e2e8f0',
    'secondary-foreground': '#475569',
    accent: '#2563eb',
    'accent-foreground': '#ffffff',
    muted: '#f8fafc',
    'muted-foreground': '#64748b',
    border: '#e2e8f0',
    input: '#f1f5f9',
    card: '#ffffff',
    'card-foreground': '#1a1a1a',
    popover: '#ffffff',
    'popover-foreground': '#1a1a1a',
    destructive: '#dc2626',
    'destructive-foreground': '#ffffff',
    success: '#047857',
    'success-foreground': '#ffffff',
    warning: '#b45309',
    'warning-foreground': '#ffffff',
    info: '#0369a1',
    'info-foreground': '#ffffff'
  },
  dark: {
    background: '#0f172a',
    foreground: '#f1f5f9',
    primary: '#2563eb',
    'primary-foreground': '#ffffff',
    secondary: '#334155',
    'secondary-foreground': '#cbd5e1',
    accent: '#60a5fa',
    'accent-foreground': '#1e293b',
    muted: '#1e293b',
    'muted-foreground': '#94a3b8',
    border: '#334155',
    input: '#1e293b',
    card: '#1e293b',
    'card-foreground': '#f1f5f9',
    popover: '#1e293b',
    'popover-foreground': '#f1f5f9',
    destructive: '#dc2626',
    'destructive-foreground': '#ffffff',
    success: '#047857',
    'success-foreground': '#ffffff',
    warning: '#fbbf24',
    'warning-foreground': '#1a1a1a',
    info: '#38bdf8',
    'info-foreground': '#1a1a1a'
  }
};

// Color pairs to check (background: text)
const colorPairs = [
  ['background', 'foreground'],
  ['primary', 'primary-foreground'],
  ['secondary', 'secondary-foreground'],
  ['accent', 'accent-foreground'],
  ['muted', 'muted-foreground'],
  ['card', 'card-foreground'],
  ['popover', 'popover-foreground'],
  ['destructive', 'destructive-foreground'],
  ['success', 'success-foreground'],
  ['warning', 'warning-foreground'],
  ['info', 'info-foreground']
];

function analyzeTheme(theme, themeName) {
  console.log(`\n=== ${themeName} Theme Analysis ===`);
  
  const issues = [];
  
  colorPairs.forEach(([bgKey, fgKey]) => {
    const bgColor = theme[bgKey];
    const fgColor = theme[fgKey];
    
    if (!bgColor || !fgColor) {
      console.log(`⚠️  Missing colors: ${bgKey} or ${fgKey}`);
      return;
    }
    
    const ratio = getContrastRatio(bgColor, fgColor);
    if (!ratio) {
      console.log(`❌ Invalid colors: ${bgKey}(${bgColor}) / ${fgKey}(${fgColor})`);
      return;
    }
    
    const standards = checkContrast(ratio);
    const status = standards.AA_normal ? '✅' : standards.AA_large ? '⚠️' : '❌';
    
    console.log(`${status} ${bgKey} / ${fgKey}: ${ratio.toFixed(2)}:1`);
    
    if (!standards.AA_normal) {
      const colorName = bgKey.replace('-foreground', '');
      const fix = getColorFix(bgColor, fgColor, colorName);
      
      issues.push({
        pair: `${bgKey} / ${fgKey}`,
        current: ratio.toFixed(2),
        bgColor,
        fgColor,
        colorName,
        fix: fix,
        themeType: themeName.toLowerCase()
      });
    }
  });
  
  return issues;
}

function main() {
  console.log('🎨 Theme Contrast Analysis\n');
  console.log('WCAG Standards:');
  console.log('✅ AA Normal Text: 4.5:1 minimum');
  console.log('⚠️  AA Large Text: 3:1 minimum');
  console.log('❌ Below AA standards');
  
  const lightIssues = analyzeTheme(defaultTheme.light, 'Light');
  const darkIssues = analyzeTheme(defaultTheme.dark, 'Dark');
  
  console.log('\n=== Summary ===');
  
  if (lightIssues.length === 0 && darkIssues.length === 0) {
    console.log('🎉 All color combinations meet WCAG AA standards!');
  } else {
    console.log('\n🔧 Issues Found and Fixes:');
    
    [...lightIssues, ...darkIssues].forEach(issue => {
      console.log(`\n${issue.pair} (${issue.themeType}): ${issue.current}:1`);
      console.log(`  Current: ${issue.bgColor} / ${issue.fgColor}`);
      
      if (issue.fix) {
        const themeSpecific = issue.fix[issue.themeType];
        if (typeof themeSpecific === 'object') {
          console.log(`  Fix: Change to ${themeSpecific.bg} / ${themeSpecific.fg}`);
        } else if (typeof themeSpecific === 'string') {
          console.log(`  Fix: Change background to ${themeSpecific}`);
        } else {
          console.log(`  Fix: Use darker/lighter variant for better contrast`);
        }
      } else {
        console.log(`  Fix: Adjust colors for 4.5:1 contrast ratio`);
      }
    });
    
    console.log('\n📝 To fix these issues, update the theme files accordingly.');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getContrastRatio,
  checkContrast,
  getColorFix,
  analyzeTheme
};
