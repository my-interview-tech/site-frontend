import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@my-interview/ui-kit'

import { AdSlot } from '../AdSlot'

const meta = {
  title: 'common/components/AdSlot',
  component: AdSlot,
  args: {
    caption: '240 × 400',
    label: 'Реклама',
    size: 'sidebar',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdSlot>

export default meta

type Story = StoryObj<typeof meta>

export const Sidebar: Story = {}

export const Custom: Story = {
  args: {
    caption: 'свой размер',
    size: { height: 120, width: 320 },
  },
}

const FullscreenDemo = () => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <Button size={40} variant="secondary" onClick={() => setIsOpen(true)}>
        Показать
      </Button>
    )
  }

  return <AdSlot caption="на весь экран" label="Реклама" size="fullscreen" onClose={() => setIsOpen(false)} />
}

export const Fullscreen: Story = {
  render: () => <FullscreenDemo />,
}
