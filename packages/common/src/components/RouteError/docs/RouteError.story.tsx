import type { Meta, StoryObj } from '@storybook/react-vite'

import { RouteError } from '../RouteError'

const meta = {
  title: 'common/components/RouteError',
  component: RouteError,
  args: {
    onClose: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RouteError>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Overlay: Story = {
  args: {
    overlay: true,
    onClose: () => undefined,
  },
}

export const Compact: Story = {
  args: {
    compact: true,
    retry: false,
    title: 'Страница не найдена',
    caption: 'Такого адреса нет. Проверьте ссылку или вернитесь на главную.',
    onBack: () => undefined,
  },
}
