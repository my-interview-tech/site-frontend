import { Button, Flex, IconButton, Image, Link, STATIC_URL, Title, theme } from '@my-interview/ui-kit'

import { Styled } from './RouteError.styled'
import type { RouteErrorProps } from './RouteError.types'

const reload = () => {
  window.location.reload()
}

/**
 * Карточка ошибки маршрута: закрытие, повтор и ссылка на главную.
 *
 * @description
 * - С `onClose` крестик закрывает карточку, без него ведёт на главную.
 * - `retry={false}` прячет «Повторить». Так устроена страница 404: остаются «Назад» и «На главную».
 * - «Назад» есть только с `onBack`.
 */
export const RouteError = ({
  caption = 'Сервер временно недоступен. Попробуйте повторить запрос или обновите страницу.',
  compact = false,
  homeHref = '/',
  onBack,
  onClose,
  onRetry = reload,
  overlay = false,
  retry = true,
  title = 'Не удалось загрузить данные',
}: RouteErrorProps) => (
  <Styled.Stage
    $compact={compact}
    $overlay={overlay}
    alignItems="center"
    data-nav-surface="page"
    justifyContent="center"
    p={
      compact
        ? `${theme.spacings.s96}px ${theme.spacings.s16}px ${theme.spacings.s48}px`
        : `${theme.spacings.s40}px ${theme.spacings.s16}px`
    }
  >
    <Styled.Card aria-label={title} role="alertdialog">
      <Styled.Close>
        {onClose ? (
          <IconButton iconSrc="icon-cross" label="Закрыть" size={32} variant="text" onClick={onClose} />
        ) : (
          <IconButton as={Link} href={homeHref} iconSrc="icon-cross" label="Закрыть" size={32} variant="text" />
        )}
      </Styled.Close>

      <Flex alignItems="center" flexDirection="column" gap={theme.spacings.s20}>
        <Image alt="" height={180} src={`${STATIC_URL}/images/error-illustration.png`} width={240} />

        <Styled.Copy>
          <Title size={700} subtitle={caption} title={title} titleAs="h1" />
        </Styled.Copy>

        <Flex gap={theme.spacings.s12} justifyContent="center">
          {onBack && (
            <Button type="button" variant="inverse" onClick={onBack}>
              Назад
            </Button>
          )}

          {retry && (
            <Button type="button" variant="primary" onClick={onRetry}>
              Повторить
            </Button>
          )}

          <Button as={Link} href={homeHref} variant={retry ? 'secondary' : 'primary'}>
            На главную
          </Button>
        </Flex>
      </Flex>
    </Styled.Card>
  </Styled.Stage>
)
