import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { Flex } from '../Flex'

const Block = styled.div`
  background: rgba(114, 46, 209, 0.12);
  min-height: 80px;
  padding: 16px;
`

const meta = {
  title: 'ui-kit/components/Flex',
  component: Flex,
  args: {
    gap: 16,
    justifyContent: 'space-around',
    p: 16,
    tablet: { gap: 20, justifyContent: 'space-between' },
    desktopS: { gap: 50 },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Flex {...args}>
      <Block>1</Block>
      <Block>2</Block>
      <Block>3</Block>
      <Block>4</Block>
    </Flex>
  ),
}
