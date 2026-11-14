import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chip } from '../Chip'

const meta = {
  title: 'ui-kit/components/Chip',
  component: Chip,
  args: {
    children: '1 мес',
    isSelected: false,
    size: 32,
    variant: 'round',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Round: Story = {}

export const Rect: Story = {
  args: {
    children: 'frontend, backend',
    variant: 'rect',
  },
}
