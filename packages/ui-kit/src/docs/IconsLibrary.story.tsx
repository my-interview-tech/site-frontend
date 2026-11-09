import { useEffect, useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { Flex } from '../components/Flex'
import { ICONS_URL } from '../components/Icon/Icon.constants'
import { getIconsTree } from '../components/Icon/lib/getIconsTree'
import { Image } from '../components/Image'
import { Text } from '../components/Text'
import { theme } from '../theme/theme'

const Search = styled.input`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r8}px;
  font: inherit;
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  width: 320px;
`

const Tile = styled.button`
  align-items: center;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r12}px;
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacings.s8}px;
  padding: ${theme.spacings.s12}px;
  width: 128px;
`

const Glyph = styled.span`
  align-items: center;
  background: ${theme.colors.white};
  border-radius: ${theme.radii.r8}px;
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  width: 40px;
`

const TileName = styled(Text)`
  overflow-wrap: anywhere;
  text-align: center;
`

const IconsLibrary = () => {
  const [icons, setIcons] = useState<string[]>([])
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getIconsTree()
      .then(setIcons)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : String(reason)))
  }, [])

  const visible = useMemo(() => icons.filter((icon) => icon.includes(query.trim())), [icons, query])

  const copy = (icon: string) => {
    void navigator.clipboard.writeText(icon)
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <Flex flexDirection="column" gap={16}>
      <Flex alignItems="center" gap={12}>
        <Search placeholder="Поиск по имени" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Text font={300}>
          {visible.length} из {icons.length}.
        </Text>
      </Flex>
      <Flex flexWrap="wrap" gap={8}>
        {visible.map((icon) => (
          <Tile key={icon} title={icon} type="button" onClick={() => copy(icon)}>
            <Glyph>
              <Image alt="" height={28} src={`${ICONS_URL}/${icon}.svg`} width={28} />
            </Glyph>
            <TileName font={200}>{icon}</TileName>
          </Tile>
        ))}
      </Flex>
    </Flex>
  )
}

const meta = {
  title: 'ui-kit/docs/Библиотека иконок',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

/** Все иконки `static/src/icons` с поиском. Клик копирует имя для `iconSrc`. */
export const Library: Story = {
  name: 'Библиотека иконок',
  render: () => <IconsLibrary />,
}
