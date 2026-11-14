import type { Meta, StoryObj } from '@storybook/react-vite'

import { Specialties } from '../Specialties'

const meta = {
  title: 'common/components/Specialties',
  component: Specialties,
  parameters: {
    docs: { story: { iframeHeight: 1100, inline: false } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Specialties>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
