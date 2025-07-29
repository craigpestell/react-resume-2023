import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DarkThemeToggle from '../components/DarkThemeToggle';

const meta: Meta<typeof DarkThemeToggle> = {
  title: 'Components/DarkThemeToggle',
  component: DarkThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable dark mode toggle component that synchronizes dark/light mode across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show text label next to the icon',
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

export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const CustomStyling: Story = {
  args: {
    className: 'border-2 border-primary',
    showLabel: true,
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex items-center space-x-4">
          <DarkThemeToggle size="sm" showLabel />
          <DarkThemeToggle size="md" showLabel />
          <DarkThemeToggle size="lg" showLabel />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex items-center space-x-4">
          <DarkThemeToggle variant="default" />
          <DarkThemeToggle variant="secondary" />
          <DarkThemeToggle variant="ghost" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Labels</h3>
        <div className="flex items-center space-x-4">
          <DarkThemeToggle variant="default" showLabel />
          <DarkThemeToggle variant="secondary" showLabel />
          <DarkThemeToggle variant="ghost" showLabel />
        </div>
      </div>
    </div>
  ),
};
