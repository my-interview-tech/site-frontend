import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../../Text'
import { Code } from '../Code'

const meta = {
  title: 'ui-kit/components/Code',
  component: Code,
  args: {
    children: 'document.doctype',
    variant: 'inline',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Code>

export default meta

type Story = StoryObj<typeof meta>

export const Inline: Story = {
  render: (args) => (
    <Text font={400}>
      Проверка <Code {...args} /> в строке
    </Text>
  ),
}

const BLOCK = `const answer = document.doctype
console.log(answer?.name ?? 'html')
const line = 'padding: 0 140px 0 140px 0 140px 0 140px'`

export const Block: Story = {
  args: {
    children: BLOCK,
    variant: 'block',
  },
}
