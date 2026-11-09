import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '../Badge'

const meta = {
  title: 'ui-kit/components/Badge',
  component: Badge,
  args: {
    children: 'По подписке',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
