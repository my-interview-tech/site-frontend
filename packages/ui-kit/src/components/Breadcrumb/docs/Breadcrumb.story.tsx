import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from '../Breadcrumb'

const meta = {
  title: 'ui-kit/components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Path: Story = {
  args: {
    items: [{ href: '/#specialties', label: 'Главная' }, { href: '/topics/react', label: 'React' }, { label: 'Хуки' }],
  },
}
