import type { Meta, StoryObj } from '@storybook/react-vite'

import { ICONS_URL } from '../../Icon/Icon.constants'
import { Flex } from '../../Flex'
import { IconButton } from '../../IconButton'
import { Image } from '../../Image'
import { Cell } from '../Cell'

const ACTIONS = (
  <Flex gap={8}>
    <IconButton iconSrc="icon-bookmark" label="Сохранить" variant="text" onClick={() => undefined} />
  </Flex>
)

const meta = {
  title: 'ui-kit/components/Cell',
  component: Cell,
  args: {
    slotBefore: <Image alt="React" height={48} src={`${ICONS_URL}/icon-react.svg`} width={48} />,
    subtitle: 'Коротко, зачем эта карточка.',
    title: 'Зачем читать эту статью',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Cell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBadgeAndAction: Story = {
  args: {
    badge: { children: 'По подписке', iconSrc: 'icon-lock' },
    slotAfter: ACTIONS,
  },
}
