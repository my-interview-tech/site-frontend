import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

import { PageContainer } from '../PageContainer'

const Block = styled.div`
  background: ${theme.colors.surface};
  border: 1px dashed ${theme.colors.borderStrong};
  min-height: ${theme.spacings.s80}px;
`

const meta = {
  title: 'common/components/PageContainer',
  component: PageContainer,
  args: {
    children: <Block />,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageContainer>

export default meta

type Story = StoryObj<typeof meta>

export const Mobile: Story = {
  globals: { viewport: { isRotated: false, value: '375' } },
}

export const Tablet: Story = {
  globals: { viewport: { isRotated: false, value: '768' } },
}

export const Desktop: Story = {
  globals: { viewport: { isRotated: false, value: '1920' } },
}
