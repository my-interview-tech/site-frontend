import { useState } from 'react'

import { IconButton, Title, theme } from '@my-interview/ui-kit'

import { resolveAdSlotSize } from './AdSlot.lib'
import { Styled } from './AdSlot.styled'
import type { AdSlotProps } from './AdSlot.types'

/**
 * Рекламный слот.
 *
 * @description
 * - `sidebar` — 240×400.
 * - `fullscreen` — на весь экран, с кнопкой закрытия.
 * - Свой `{ width, height }` не требует нового ключа карты.
 */
export const AdSlot = ({ caption, id, label, onClose, size = 'sidebar' }: AdSlotProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const box = resolveAdSlotSize(size)

  if (isClosed) {
    return null
  }

  const handleClose = () => {
    setIsClosed(true)
    onClose?.()
  }

  return (
    <Styled.Slot
      $height={box.height}
      $isFullscreen={box.isClosable}
      $width={box.width}
      alignItems="center"
      data-ad-slot={id}
      flexDirection="column"
      gap={theme.spacings.s8}
      justifyContent="center"
    >
      {box.isClosable && (
        <Styled.Close>
          <IconButton iconSrc="icon-cross" label="Закрыть" size={32} variant="text" onClick={handleClose} />
        </Styled.Close>
      )}

      <Styled.Copy>
        <Title size={400} subtitle={caption} title={label} />
      </Styled.Copy>
    </Styled.Slot>
  )
}
