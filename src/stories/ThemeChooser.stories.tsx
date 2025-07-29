import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThemeChooser from '../components/ThemeChooser';

const meta: Meta<typeof ThemeChooser> = {
  title: 'Components/ThemeChooser',
  component: ThemeChooser,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composite component that combines dark mode toggle and theme color selector for complete theme management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction for the theme controls',
    },
    spacing: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Spacing between the controls',
    },
    showLabels: {
      control: { type: 'boolean' },
      description: 'Whether to show descriptive labels',
    },
    darkToggleVariant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'ghost'],
      description: 'Visual style variant for the dark mode toggle',
    },
    darkToggleSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the dark mode toggle button',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};

export const Vertical: Story = {
  args: {
    layout: 'vertical',
    showLabels: true,
  },
};

export const Compact: Story = {
  args: {
    spacing: 'sm',
  },
};

export const Spacious: Story = {
  args: {
    spacing: 'lg',
    showLabels: true,
  },
};

export const SecondaryStyle: Story = {
  args: {
    darkToggleVariant: 'secondary',
    showLabels: true,
  },
};

export const LargeControls: Story = {
  args: {
    darkToggleSize: 'lg',
    spacing: 'lg',
    showLabels: true,
  },
};

export const FooterStyle: Story = {
  args: {
    showLabels: true,
    spacing: 'sm',
    darkToggleVariant: 'ghost',
    darkToggleSize: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration used in the application footer.',
      },
    },
  },
};

export const HeaderStyle: Story = {
  args: {
    showLabels: false,
    spacing: 'md',
    darkToggleVariant: 'secondary',
    darkToggleSize: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration suitable for header usage.',
      },
    },
  },
};

export const AllLayouts: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Horizontal Layout</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Default</h4>
            <ThemeChooser layout="horizontal" />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">With Labels</h4>
            <ThemeChooser layout="horizontal" showLabels />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Large Spacing</h4>
            <ThemeChooser layout="horizontal" showLabels spacing="lg" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vertical Layout</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Default</h4>
            <ThemeChooser layout="vertical" />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">With Labels</h4>
            <ThemeChooser layout="vertical" showLabels />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Large Spacing</h4>
            <ThemeChooser layout="vertical" showLabels spacing="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Theme Chooser Interactive Demo</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience real-time theme switching with both dark/light mode and color themes. 
          Watch how every element responds to your choices instantly.
        </p>
      </div>

      {/* Theme Controls */}
      <div className="flex justify-center">
        <div className="bg-card border rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
            Theme Controls
          </h3>
          <ThemeChooser 
            showLabels 
            spacing="lg" 
            darkToggleSize="md" 
            darkToggleVariant="secondary"
          />
        </div>
      </div>

      {/* Color Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Colors */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-bold mb-3">Primary</h4>
          <p className="mb-4">The main brand color that changes dramatically with each theme.</p>
          <div className="space-y-2">
            <div className="bg-primary/80 p-2 rounded text-sm">Primary/80</div>
            <div className="bg-primary/60 p-2 rounded text-sm">Primary/60</div>
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="bg-secondary text-secondary-foreground rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-bold mb-3">Secondary</h4>
          <p className="mb-4">Complementary colors that work with the primary theme.</p>
          <div className="space-y-2">
            <div className="bg-secondary/80 p-2 rounded text-sm">Secondary/80</div>
            <div className="bg-secondary/60 p-2 rounded text-sm">Secondary/60</div>
          </div>
        </div>

        {/* Card Colors */}
        <div className="bg-card text-card-foreground border rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-bold mb-3">Card</h4>
          <p className="mb-4">Background for elevated content areas.</p>
          <div className="space-y-2">
            <div className="bg-muted p-2 rounded text-sm">Muted background</div>
            <div className="text-muted-foreground text-sm">Muted text</div>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="bg-card border rounded-xl p-6 shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-card-foreground mb-4">Interactive Elements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Button Variants</h4>
            <div className="space-y-3">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors w-full">
                Primary Button
              </button>
              <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors w-full">
                Secondary Button
              </button>
              <button className="border border-border hover:bg-muted text-foreground px-4 py-2 rounded-lg transition-colors w-full">
                Outline Button
              </button>
            </div>
          </div>

          {/* Text Hierarchy */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Text Hierarchy</h4>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Heading 1</h1>
              <h2 className="text-xl font-semibold text-foreground">Heading 2</h2>
              <p className="text-foreground">Normal body text that adapts to the theme.</p>
              <p className="text-muted-foreground text-sm">Muted text for less important content.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Preview Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground text-center">Available Themes Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Default', color: '#ffffff', dark: '#000000' },
            { name: 'Cyberpunk', color: '#ff00ff', dark: '#0a0a0a' },
            { name: 'Darkula', color: '#6897bb', dark: '#2b2b2b' },
            { name: 'Dracula', color: '#bd93f9', dark: '#282a36' },
            { name: 'Forest', color: '#16a34a', dark: '#0f172a' },
            { name: 'Matrix', color: '#00ff00', dark: '#000000' },
            { name: 'Midnight', color: '#6366f1', dark: '#0f172a' },
            { name: 'Monokai', color: '#66d9ef', dark: '#272822' },
            { name: 'Nord', color: '#5e81ac', dark: '#2e3440' },
            { name: 'Ocean', color: '#0891b2', dark: '#0c4a6e' },
            { name: 'Purple', color: '#9333ea', dark: '#1e1b4b' },
            { name: 'Rose', color: '#e11d48', dark: '#4c0519' },
            { name: 'Sunset', color: '#ea580c', dark: '#431407' },
          ].map((theme) => (
            <div key={theme.name} className="text-center">
              <div className="mb-2 mx-auto w-16 h-16 rounded-lg border shadow-md flex">
                <div 
                  className="w-1/2 rounded-l-lg" 
                  style={{ backgroundColor: theme.color }}
                />
                <div 
                  className="w-1/2 rounded-r-lg" 
                  style={{ backgroundColor: theme.dark }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 border rounded-xl p-6 text-center">
        <h4 className="font-semibold text-foreground mb-2">How to Use</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>🌙 Click the sun/moon icon to toggle between light and dark modes</p>
          <p>🎨 Click the palette icon to open the theme selector and choose from 13 unique themes</p>
          <p>✨ Watch how all colors and elements update instantly across the entire demo</p>
        </div>
      </div>
    </div>
  ),
};

export const InApplicationContext: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      {/* Mock Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded"></div>
              <h1 className="text-xl font-bold text-foreground">My App</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground">Home</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </nav>
            <ThemeChooser />
          </div>
        </div>
      </header>

      {/* Mock Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Welcome to My App</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This demonstrates how the ThemeChooser works in a real application context.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium">
              Get Started
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature One</h3>
              <p className="text-muted-foreground">
                Description of an amazing feature that adapts to your chosen theme.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature Two</h3>
              <p className="text-muted-foreground">
                Another great feature that looks good in any theme you choose.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Feature Three</h3>
              <p className="text-muted-foreground">
                The final feature showcasing theme consistency across components.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mock Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground">© 2025 My App. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">Theme:</span>
              <ThemeChooser showLabels spacing="sm" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Shows how ThemeChooser integrates into a complete application layout, appearing in both header and footer.',
      },
    },
  },
};
