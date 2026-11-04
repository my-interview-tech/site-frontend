import { useState } from 'react'
import { useTheme } from 'styled-components'

import { FaqItem, Flex, Text } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { FAQ_GROUPS, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция FAQ: группы слева, вопросы выбранной группы справа.
 * @access private
 * @description Секция FAQ: группы слева, вопросы выбранной группы справа.
 */
export const HomeFaq = () => {
  const theme = useTheme()
  const [groupId, setGroupId] = useState(FAQ_GROUPS[0].id)
  const [openId, setOpenId] = useState('source')

  const group = FAQ_GROUPS.find((item) => item.id === groupId) ?? FAQ_GROUPS[0]

  return (
    <HomeSection fillViewport gap={theme.spacings.s32} id="faq" surface="canvas">
      <Text as="h2" color={theme.colors.textPrimary} font="h2">
        {TEXT.TITLE}
      </Text>

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
            <Styled.NavButton
              key={item.id}
              $isActive={item.id === groupId}
              type="button"
              onClick={() => setGroupId(item.id)}
            >
              {item.title}
            </Styled.NavButton>
          ))}
        </Styled.SideNav>

        <Flex flex={1} flexDirection="column" gap={theme.spacings.s12}>
          {group.items.map((item) => (
            <FaqItem
              key={item.id}
              answer={item.answer}
              isOpen={openId === item.id}
              minusSrc={asset('icons/icon-minus.svg')}
              plusSrc={asset('icons/icon-plus.svg')}
              question={item.question}
              onToggle={() => {
                if (!item.answer) {
                  return
                }

                setOpenId((current) => (current === item.id ? '' : item.id))
              }}
            />
          ))}
        </Flex>
      </Flex>

      <Text as="p" color={theme.colors.textSecondary} font="body">
        {TEXT.HINT}
      </Text>
    </HomeSection>
  )
}
