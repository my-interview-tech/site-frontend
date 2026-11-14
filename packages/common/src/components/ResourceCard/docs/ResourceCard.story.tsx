import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResourceCard } from '../ResourceCard'

const meta = {
  title: 'common/components/ResourceCard',
  component: ResourceCard,
  args: {
    href: 'https://developer.mozilla.org/ru/docs/Web/HTML',
    image: '/src/images/feature-theory.png',
    title: 'Документация HTML',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourceCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
