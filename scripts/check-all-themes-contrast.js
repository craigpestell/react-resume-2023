#!/usr/bin/env node

/**
 * Comprehensive contrast ratio checker for all theme files
 * Analyzes all CSS theme files and checks WCAG contrast compliance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Parse CSS theme file to extract color variables
function parseThemeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const colors = {};
    
    // Extract CSS custom properties
    const matches = content.matchAll(/--([a-z-]+):\s*([#][a-fA-F0-9]{6}|[#][a-fA-F0-9]{3})/g);
    
    for (const match of matches) {
      const [, property, value] = match;
      colors[property] = value;
    }
    
    return colors;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return {};
  }
}

// Get theme name from file path
function getThemeName(filePath) {
  return path.basename(filePath, '.css');
}

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

// Analyze a single theme
function analyzeTheme(colors, themeName) {
  console.log(`\n=== ${themeName.toUpperCase()} Theme ===`);
  
  const issues = [];
  let totalPairs = 0;
  let passingPairs = 0;
  
  colorPairs.forEach(([bgKey, fgKey]) => {
    const bgColor = colors[bgKey];
    const fgColor = colors[fgKey];
    
    if (!bgColor || !fgColor) {
      // Only show missing pairs for non-index themes
      if (themeName !== 'index') {
        console.log(`⚠️  Missing: ${bgKey} or ${fgKey}`);
      }
      return;
    }
    
    totalPairs++;
    const ratio = getContrastRatio(bgColor, fgColor);
    
    if (!ratio) {
      console.log(`❌ Invalid: ${bgKey}(${bgColor}) / ${fgKey}(${fgColor})`);
      return;
    }
    
    const standards = checkContrast(ratio);
    const status = standards.AA_normal ? '✅' : standards.AA_large ? '⚠️' : '❌';
    
    if (standards.AA_normal) {
      passingPairs++;
    }
    
    console.log(`${status} ${bgKey} / ${fgKey}: ${ratio.toFixed(2)}:1 (${bgColor} / ${fgColor})`);
    
    if (!standards.AA_normal) {
      issues.push({
        pair: `${bgKey} / ${fgKey}`,
        ratio: ratio.toFixed(2),
        bgColor,
        fgColor,
        standard: standards
      });
    }
  });
  
  const score = totalPairs > 0 ? ((passingPairs / totalPairs) * 100).toFixed(1) : 'N/A';
  console.log(`\nScore: ${passingPairs}/${totalPairs} pairs passing AA standards (${score}%)`);
  
  return { issues, totalPairs, passingPairs, score };
}

// Suggest color improvements
function suggestImprovements(issues, themeName) {
  if (issues.length === 0) return;
  
  console.log(`\n🔧 Suggested fixes for ${themeName}:`);
  
  issues.forEach(issue => {
    console.log(`\n${issue.pair}: ${issue.ratio}:1 → needs 4.5:1`);
    console.log(`  Current: ${issue.bgColor} / ${issue.fgColor}`);
    
    // Calculate needed adjustment
    const currentRatio = parseFloat(issue.ratio);
    const targetRatio = 4.5;
    const adjustment = targetRatio / currentRatio;
    
    if (adjustment > 1) {
      console.log(`  Suggestion: Increase contrast by ${(adjustment * 100 - 100).toFixed(0)}%`);
      console.log(`  → Make text color darker or background lighter`);
    }
  });
}

// Main function
function main() {
  console.log('🎨 COMPREHENSIVE THEME CONTRAST ANALYSIS');
  console.log('=========================================\n');
  console.log('WCAG Standards:');
  console.log('✅ AA Normal Text: 4.5:1 minimum');
  console.log('⚠️  AA Large Text: 3:1 minimum');
  console.log('❌ Below AA standards\n');
  
  const themesDir = path.join(__dirname, '..', 'src', 'app', 'themes');
  
  if (!fs.existsSync(themesDir)) {
    console.error('Themes directory not found:', themesDir);
    return;
  }
  
  const themeFiles = fs.readdirSync(themesDir)
    .filter(file => file.endsWith('.css'))
    .sort();
  
  const results = [];
  let totalIssues = 0;
  
  themeFiles.forEach(file => {
    const filePath = path.join(themesDir, file);
    const themeName = getThemeName(file);
    const colors = parseThemeFile(filePath);
    
    const result = analyzeTheme(colors, themeName);
    result.themeName = themeName;
    result.file = file;
    results.push(result);
    
    totalIssues += result.issues.length;
    
    if (result.issues.length > 0) {
      suggestImprovements(result.issues, themeName);
    }
  });
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  
  // Sort by score (best first)
  const sortedResults = results
    .filter(r => r.totalPairs > 0)
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  
  console.log('\n🏆 Theme Rankings (by AA compliance):');
  sortedResults.forEach((result, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
    const status = parseFloat(result.score) === 100 ? '✅' : parseFloat(result.score) >= 80 ? '⚠️' : '❌';
    console.log(`${medal} ${status} ${result.themeName.padEnd(12)} ${result.score.padStart(5)}% (${result.passingPairs}/${result.totalPairs})`);
  });
  
  console.log(`\n📈 Overall Statistics:`);
  console.log(`• Total themes analyzed: ${results.filter(r => r.totalPairs > 0).length}`);
  console.log(`• Total contrast issues: ${totalIssues}`);
  console.log(`• Themes with perfect scores: ${sortedResults.filter(r => parseFloat(r.score) === 100).length}`);
  console.log(`• Themes needing improvement: ${sortedResults.filter(r => parseFloat(r.score) < 100).length}`);
  
  // Worst offenders
  const worstThemes = sortedResults.filter(r => parseFloat(r.score) < 80);
  if (worstThemes.length > 0) {
    console.log(`\n❌ Themes requiring immediate attention (< 80% compliance):`);
    worstThemes.forEach(result => {
      console.log(`• ${result.themeName}: ${result.score}% (${result.issues.length} issues)`);
    });
  }
  
  if (totalIssues === 0) {
    console.log('\n🎉 Congratulations! All themes meet WCAG AA standards!');
  } else {
    console.log(`\n🔧 ${totalIssues} total issues found. See suggestions above for improvements.`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  parseThemeFile,
  analyzeTheme,
  getContrastRatio,
  checkContrast
};
