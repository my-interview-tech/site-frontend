import { useTheme } from 'styled-components'

import { ErrorState } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

type Props = {
  /**
   * Вернуться на предыдущий экран.
   */
  onBack: () => void

  /**
   * Повторить загрузку статьи.
   */
  onReload: () => void
}

/**
 * Экран ошибки при загрузке статьи.
 */
export const Error = (props: Props) => {
  const theme = useTheme()

  return (
    <Flex alignItems="center" justifyContent="center" style={{ minHeight: `calc(100vh - ${theme.spacings.s96}px)` }}>
      <ErrorState {...props} />
    </Flex>
  )
}
