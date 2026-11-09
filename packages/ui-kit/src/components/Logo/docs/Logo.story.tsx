import type { Meta, StoryObj } from '@storybook/react-vite'

import { ICONS_URL } from '../../Icon/Icon.constants'
import { Logo } from '../Logo'

const meta = {
  title: 'ui-kit/components/Logo',
  component: Logo,
  args: {
    href: '/',
    src: `${ICONS_URL}/logo-mark.svg`,
    title: 'my-interview.tech',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
