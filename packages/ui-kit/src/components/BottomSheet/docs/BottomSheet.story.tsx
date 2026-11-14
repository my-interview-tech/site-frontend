import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../Button'
import { Text } from '../../Text'
import { BottomSheet } from '../BottomSheet'

const meta = {
  title: 'ui-kit/components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>

export default meta

type Story = StoryObj<typeof meta>

const Opened = ({ subtitle }: { subtitle?: string }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть</Button>

      <BottomSheet isOpen={isOpen} subtitle={subtitle} title="Сначала изучите" onClose={() => setIsOpen(false)}>
        <Text as="p">Сначала разберите основы языка и типизацию.</Text>
      </BottomSheet>
    </>
  )
}

const args = {
  children: 'Сначала разберите основы языка и типизацию.',
  isOpen: true,
  title: 'Сначала изучите',
  onClose: () => undefined,
}

const mobile = { viewport: { value: '320', isRotated: false } }

export const Open: Story = {
  args,
  globals: mobile,
  render: () => <Opened />,
}
