import type { ElementType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { typography } from '../../../theme/typography'
import type { TypographyStep } from '../../../theme/typography'
import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { Text } from '../Text'
import type { TextProps } from '../Text.types'

type ToneTextProps = TextProps<ElementType> & {
  /**
   * Ключ цвета темы.
   */
  tone: keyof typeof theme.colors
}

const ToneText = ({ tone, ...props }: ToneTextProps) => <Text {...props} color={theme.colors[tone]} />

const STEPS = Object.keys(typography).map(Number) as TypographyStep[]

const meta = {
  title: 'ui-kit/components/Text',
  component: Text,
  args: {
    as: 'p',
    children: 'Связь с интервью',
    font: 200,
    tracking: 'wide',
    uppercase: true,
    weight: 'semibold',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Eyebrow: Story = {
  render: (args) => <ToneText {...args} tone="textTertiary" />,
}

export const Caption: Story = {
  args: {
    children: 'DOCTYPE на собеседовании',
    font: 600,
    weight: 'semibold',
  },
  render: (args) => <ToneText {...args} tone="textPrimary" />,
}

export const Body: Story = {
  args: {
    children: 'Короткий абзац о том, зачем это знать.',
    font: 400,
  },
  render: (args) => <ToneText {...args} tone="textSecondary" />,
}

export const Title: Story = {
  args: {
    as: 'h2',
    children: 'Зачем нужен DOCTYPE?',
    font: 700,
    weight: 'semibold',
  },
  render: (args) => <ToneText {...args} tone="textPrimary" />,
}

export const Price: Story = {
  args: {
    children: 'от 568 ₽/мес',
    font: 900,
    weight: 'bold',
  },
  render: (args) => <ToneText {...args} tone="accent" />,
}

export const Breakpoints: Story = {
  args: {
    children: 'Кегль растёт на планшете.',
    font: 400,
    tablet: { font: 500 },
  },
  render: (args) => <ToneText {...args} tone="textSecondary" />,
}

export const Scale: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap={12}>
      {STEPS.map((step) => (
        <ToneText key={step} as="p" font={step} tone="textPrimary" weight={args.weight}>
          {step} — {typography[step].size}/{typography[step].lineHeight} Связь с интервью
        </ToneText>
      ))}
    </Flex>
  ),
}
