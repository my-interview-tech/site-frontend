import { useId, useState } from 'react'

import { theme } from '../../theme/theme'
import { Cell } from '../Cell'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { Styled } from './Accordion.styled'
import type { AccordionProps } from './Accordion.types'

/**
 * Аккордеон: `Cell` с шевроном и раскрываемой панелью.
 */
export const Accordion = ({ children, isOpen, onToggle, slotAfter, title, ...cellProps }: AccordionProps) => {
  const [isOwnOpen, setIsOwnOpen] = useState(false)
  const panelId = useId()
  const isControlled = isOpen !== undefined
  const isExpanded = isControlled ? isOpen : isOwnOpen

  const toggle = () => {
    if (!isControlled) {
      setIsOwnOpen((open) => !open)
    }
    onToggle?.()
  }

  return (
    <Flex flexDirection="column">
      <Flex relatively flexDirection="column">
        <Cell
          {...cellProps}
          slotAfter={
            <>
              {Boolean(slotAfter) && (
                <Styled.Slot relatively alignItems="center">
                  {slotAfter}
                </Styled.Slot>
              )}
              <Styled.Chevron alignItems="center" flexShrink={0} justifyContent="center">
                <Icon isMonochrome direction={isExpanded ? 'up' : 'down'} iconSrc="icon-chevron" />
              </Styled.Chevron>
            </>
          }
          title={title}
        />
        <Styled.Trigger aria-controls={panelId} aria-expanded={isExpanded} aria-label={title} onClick={toggle} />
      </Flex>

      <Styled.Panel $isOpen={isExpanded} id={panelId} inert={!isExpanded}>
        <Styled.Clip>
          <Styled.Body flexDirection="column" gap={theme.spacings.s16} p={`${theme.spacings.s16}px 0`}>
            {children}
          </Styled.Body>
        </Styled.Clip>
      </Styled.Panel>
    </Flex>
  )
}
