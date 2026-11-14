import type { Meta, StoryObj } from '@storybook/react-vite'

import { AnchorHeading } from '../AnchorHeading'

const meta = {
  title: 'common/components/AnchorHeading',
  component: AnchorHeading,
  args: {
    children: 'Зачем нужен DOCTYPE?',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnchorHeading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
