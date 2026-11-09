import type { Meta, StoryObj } from '@storybook/react-vite'

import { ErrorState } from '../ErrorState'

const meta = {
  title: 'common/components/ErrorState',
  component: ErrorState,
  args: {
    onBack: () => undefined,
    onReload: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
