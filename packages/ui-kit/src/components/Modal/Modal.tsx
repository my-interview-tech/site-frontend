import { createPortal } from 'react-dom'

import { useMountTransition } from '../../hooks/useMountTransition'
import { theme } from '../../theme/theme'
import { IconButton } from '../IconButton'
import { Title } from '../Title'
import { TEXT, TRANSITION_MS } from './Modal.constants'
import { Styled } from './Modal.styled'
import type { ModalProps } from './Modal.types'
import { useModal } from './useModal'

/**
 * Модальное окно по центру экрана.
 *
 * @description
 * - Закрытое окно не лежит в DOM: монтируется в `body` на открытие и размонтируется после анимации.
 * - Открытое блокирует скролл страницы, закрывается по Escape, фону и крестику, затем возвращает фокус.
 */
export const Modal = ({ action, children, isOpen, onClose, subtitle, title }: ModalProps) => {
  const { isMounted, isVisible } = useMountTransition(isOpen, TRANSITION_MS)
  const panelRef = useModal(isOpen && isMounted, onClose)

  if (!isMounted) {
    return null
  }

  return createPortal(
    <Styled.Root alignItems="center" justifyContent="center" p={theme.spacings.s16}>
      <Styled.Scrim $isVisible={isVisible} aria-label={TEXT.CLOSE} tabIndex={-1} onClick={onClose} />

      <Styled.Panel
        aria-modal
        ref={panelRef}
        $isVisible={isVisible}
        aria-label={title}
        flexDirection="column"
        gap={theme.spacings.s16}
        p={theme.spacings.s24}
        role="dialog"
        tabIndex={-1}
      >
        <Title
          action={<IconButton iconSrc="icon-cross" label={TEXT.CLOSE} size={32} variant="text" onClick={onClose} />}
          size={500}
          subtitle={subtitle}
          title={title}
          titleAs="h2"
        />

        {children}

        {action}
      </Styled.Panel>
    </Styled.Root>,
    document.body
  )
}
