import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeBlock } from '../CodeBlock'

const TS_SAMPLE = `type User = { id: number; name: string }

/** Первый пользователь или null. */
export const firstUser = async (url: string): Promise<User | null> => {
  const response = await fetch(url)
  const users: User[] = await response.json()

  return users[0] ?? null
}`

const meta = {
  title: 'common/components/CodeBlock',
  component: CodeBlock,
  args: {
    children: TS_SAMPLE,
    lang: 'ts',
    title: 'api/firstUser.ts',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
