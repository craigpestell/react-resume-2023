'use client';

import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeDemo() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Theme Settings</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Choose your preferred theme. The light theme provides optimal readability and a clean, professional appearance.
        </p>

        {/* Theme Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                theme === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Icon className="w-8 h-8" />
                <span className="font-medium">{label}</span>
                {theme === value && (
                  <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
                    Active
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Current Theme Info */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-foreground">Current Theme</h3>
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{theme}</span>
            {theme === 'system' && (
              <span> → Resolved: <span className="font-medium text-foreground">{effectiveTheme}</span></span>
            )}
          </p>
        </div>

        {/* Light Theme Benefits */}
        {(theme === 'light' || (theme === 'system' && effectiveTheme === 'light')) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg"
          >
            <h4 className="font-semibold text-success-foreground mb-2">✨ Light Theme Benefits</h4>
            <ul className="text-sm text-success-foreground/80 space-y-1">
              <li>• Enhanced readability in bright environments</li>
              <li>• Professional and clean appearance</li>
              <li>• Better contrast for text content</li>
              <li>• Optimized for productivity and focus</li>
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Color Palette Preview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-card border border-border rounded-xl p-8 shadow-lg"
      >
        <h3 className="text-xl font-bold text-card-foreground mb-6">Color Palette</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Primary Colors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Primary</h4>
            <div className="bg-primary h-12 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-medium">Primary</span>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Secondary</h4>
            <div className="bg-secondary h-12 rounded-lg flex items-center justify-center">
              <span className="text-secondary-foreground text-xs font-medium">Secondary</span>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Accent</h4>
            <div className="bg-accent h-12 rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground text-xs font-medium">Accent</span>
            </div>
          </div>

          {/* Muted Colors */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Muted</h4>
            <div className="bg-muted h-12 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-xs font-medium">Muted</span>
            </div>
          </div>
        </div>

        {/* Status Colors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Success</h4>
            <div className="bg-success h-12 rounded-lg flex items-center justify-center">
              <span className="text-success-foreground text-xs font-medium">Success</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Warning</h4>
            <div className="bg-warning h-12 rounded-lg flex items-center justify-center">
              <span className="text-warning-foreground text-xs font-medium">Warning</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Info</h4>
            <div className="bg-info h-12 rounded-lg flex items-center justify-center">
              <span className="text-info-foreground text-xs font-medium">Info</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Destructive</h4>
            <div className="bg-destructive h-12 rounded-lg flex items-center justify-center">
              <span className="text-destructive-foreground text-xs font-medium">Error</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
