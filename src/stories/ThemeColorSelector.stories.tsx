import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThemeColorSelector from '../components/ThemeColorSelector';

const meta: Meta<typeof ThemeColorSelector> = {
  title: 'Components/ThemeColorSelector',
  component: ThemeColorSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme color selector component that allows users to switch between different visual themes. For complete theme management including dark mode, use ThemeChooser instead.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default theme selector with all available themes.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of the theme selector functionality.',
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-6 p-6 bg-background text-foreground rounded-lg border">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Theme Demo</h3>
          <p className="text-muted-foreground">
            Use the theme selector below to see the changes in real-time.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ThemeColorSelector />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card text-card-foreground rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">Primary Colors</h4>
            <p className="text-muted-foreground">
              This demonstrates how the primary color scheme changes.
            </p>
          </div>
          
          <div className="p-4 bg-muted text-muted-foreground rounded-lg border">
            <h4 className="font-semibold mb-2">Muted Colors</h4>
            <p>
              This shows the muted color variations for each theme.
            </p>
          </div>
        </div>
      </div>
    );
  },
};
