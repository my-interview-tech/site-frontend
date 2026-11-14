import { Button, Flex, Image, STATIC_URL, Title, theme } from '@my-interview/ui-kit'

import { Styled } from './ErrorState.styled'
import type { ErrorStateProps } from './ErrorState.types'

/**
 * Карточка ошибки.
 */
export const ErrorState = ({
  caption = 'Сервер временно недоступен.\nПопробуйте повторить запрос.',
  onBack,
  onReload,
  title = 'Не удалось загрузить данные',
}: ErrorStateProps) => (
  <Styled.Frame alignItems="center" justifyContent="center">
    <Styled.Card role="alert">
      <Flex alignItems="center" flexDirection="column" gap={theme.spacings.s20}>
        <Image alt="" height={180} src={`${STATIC_URL}/images/error-illustration.png`} width={240} />
        <Styled.Copy>
          <Title size={700} subtitle={caption} title={title} titleAs="h1" />
        </Styled.Copy>
      </Flex>

      <Styled.Actions gap={theme.spacings.s12} justifyContent="center">
        <Button type="button" variant="inverse" onClick={onBack}>
          Назад
        </Button>

        <Button type="button" variant="primary" onClick={onReload}>
          Повторить
        </Button>
      </Styled.Actions>
    </Styled.Card>
  </Styled.Frame>
)
