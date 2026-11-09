import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../Button'
import { Text } from '../../Text'
import { Modal } from '../Modal'

const meta = {
  title: 'ui-kit/components/Modal',
  component: Modal,
  args: {
    children: 'Задача доступна по подписке.',
    isOpen: true,
    title: 'Оффер',
    onClose: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

const Opened = ({ hasAction = false, subtitle }: { hasAction?: boolean; subtitle?: string }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть</Button>

      <Modal
        action={
          hasAction && (
            <Button fullWidth variant="primary" onClick={() => setIsOpen(false)}>
              Оформить
            </Button>
          )
        }
        isOpen={isOpen}
        subtitle={subtitle}
        title="Оффер"
        onClose={() => setIsOpen(false)}
      >
        <Text as="p">Задача доступна по подписке.</Text>
      </Modal>
    </>
  )
}

export const Open: Story = {
  render: () => <Opened />,
}

export const WithAction: Story = {
  render: () => <Opened hasAction subtitle="Подписка" />,
}

export const Mobile: Story = {
  globals: { viewport: { value: '320', isRotated: false } },
  render: () => <Opened hasAction />,
}
