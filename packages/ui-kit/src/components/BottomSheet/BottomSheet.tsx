import { useMountTransition } from '../../hooks/useMountTransition'
import { theme } from '../../theme/theme'
import { IconButton } from '../IconButton'
import { Title } from '../Title'
import { TEXT, TRANSITION_MS } from './BottomSheet.constants'
import { Styled } from './BottomSheet.styled'
import type { BottomSheetProps } from './BottomSheet.types'
import { useBottomSheet } from './useBottomSheet'

/**
 * Нижняя шторка. Показывается только до `tablet`, шире не рендерится стилями.
 *
 * @description
 * - Закрытая шторка не лежит в DOM: монтируется на открытие и размонтируется после анимации.
 * - Открытая блокирует скролл страницы, закрывается по Escape, фону и крестику.
 */
export const BottomSheet = ({ children, isOpen, onClose, subtitle, title }: BottomSheetProps) => {
  const { isMounted, isVisible } = useMountTransition(isOpen, TRANSITION_MS)
  const panelRef = useBottomSheet(isOpen && isMounted, onClose)

  if (!isMounted) {
    return null
  }

  return (
    <Styled.Root>
      <Styled.Scrim $isVisible={isVisible} aria-label={TEXT.CLOSE} tabIndex={-1} onClick={onClose} />

      <Styled.Panel
        aria-modal
        ref={panelRef}
        $isVisible={isVisible}
        aria-label={title}
        flexDirection="column"
        gap={theme.spacings.s16}
        p={`${theme.spacings.s20}px ${theme.container.paddingMobile}px ${theme.spacings.s32}px`}
        role="dialog"
        tabIndex={-1}
      >
        <Title
          action={<IconButton iconSrc="icon-cross" label={TEXT.CLOSE} onClick={onClose} />}
          size={700}
          subtitle={subtitle}
          title={title}
          titleAs="h2"
        />

        {children}
      </Styled.Panel>
    </Styled.Root>
  )
}
