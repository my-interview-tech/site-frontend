import { useState } from 'react'

import { Accordion, Button, Cell, Flex, Text, Title, theme } from '@my-interview/ui-kit'

import { HomeSection } from '@shared/ui/home-section'

import { FAQ_GROUPS, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция FAQ: группы слева, вопросы выбранной группы справа.
 * @access private
 * @description Секция FAQ: группы слева, вопросы выбранной группы справа.
 */
export const HomeFaq = () => {
  const [groupId, setGroupId] = useState(FAQ_GROUPS[0].id)
  const [openId, setOpenId] = useState('source')

  const group = FAQ_GROUPS.find((item) => item.id === groupId) ?? FAQ_GROUPS[0]

  return (
    <HomeSection fillViewport gap={theme.spacings.s32} id="faq" surface="canvas">
      <Flex>
        <Title size={900} title={TEXT.TITLE} titleAs="h2" />
      </Flex>

      <Flex flexDirection="column" gap={theme.spacings.s48} tablet={{ flexDirection: 'row' }}>
        <Styled.SideNav
          fillWidth
          flexDirection="row"
          flexShrink={0}
          flexWrap="wrap"
          forwardedAs="nav"
          gap={theme.spacings.s8}
          tablet={{ flexDirection: 'column', flexWrap: 'nowrap', width: 220 }}
        >
          {FAQ_GROUPS.map((item) => (
            <Button
              key={item.id}
              isSelected={item.id === groupId}
              type="button"
              variant="text"
              onClick={() => setGroupId(item.id)}
            >
              {item.title}
            </Button>
          ))}
        </Styled.SideNav>

        <Flex flex={1} flexDirection="column" gap={theme.spacings.s12}>
          {group.items.map((item) => (
            <Styled.Card key={item.id} flexDirection="column" forwardedAs="article">
              {item.answer ? (
                <Accordion
                  isOpen={openId === item.id}
                  title={item.question}
                  onToggle={() => setOpenId((current) => (current === item.id ? '' : item.id))}
                >
                  <Text as="p" color={theme.colors.textSecondary} font={500}>
                    {item.answer}
                  </Text>
                </Accordion>
              ) : (
                <Cell title={item.question} />
              )}
            </Styled.Card>
          ))}
        </Flex>
      </Flex>

      <Text as="p" color={theme.colors.textSecondary} font={400}>
        {TEXT.HINT}
      </Text>
    </HomeSection>
  )
}
