import type { ElementType, MouseEvent } from 'react'

import { Spinner } from '../Spinner'
import { Styled } from './ButtonBase.styled'
import type { ButtonBaseProps } from './ButtonBase.types'

const blockClick = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

/**
 * Нижний слой кнопок ui-kit без внешнего вида: сброс стилей, кольцо фокуса, недоступность и загрузка.
 * В продукте берутся `Button` и `IconButton`, `ButtonBase` — основа кнопок внутри ui-kit.
 *
 * @description
 * - Тег `button` получает `type="button"`, если `type` не задан.
 * - Другой тег через `as` при `disabled` получает `aria-disabled` и `tabIndex={-1}`: клик глушится в фазе захвата, курсор `not-allowed` остаётся виден.
 * - `isLoading` делает кнопку недоступной, ставит `aria-busy` и рисует `Spinner` поверх скрытого содержимого: ширина не меняется.
 */
export const ButtonBase = <T extends ElementType = 'button'>({
  as,
  children,
  disabled = false,
  isLoading = false,
  ...rest
}: ButtonBaseProps<T>) => {
  const tag: ElementType = as ?? 'button'
  const isNative = tag === 'button'
  const isInactive = disabled || isLoading
  const isBlocked = !isNative && isInactive

  return (
    <Styled.Root
      as={tag}
      type={isNative ? 'button' : undefined}
      {...rest}
      aria-busy={isLoading || undefined}
      aria-disabled={isBlocked || undefined}
      disabled={isNative ? isInactive : undefined}
      tabIndex={isBlocked ? -1 : rest.tabIndex}
      onAuxClickCapture={isBlocked ? blockClick : rest.onAuxClickCapture}
      onClickCapture={isBlocked ? blockClick : rest.onClickCapture}
    >
      {isLoading ? (
        <>
          <Styled.Content>{children}</Styled.Content>
          <Styled.Loader alignItems="center" forwardedAs="span" justifyContent="center">
            <Spinner />
          </Styled.Loader>
        </>
      ) : (
        children
      )}
    </Styled.Root>
  )
}
