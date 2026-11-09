import type { JSX } from 'react/jsx-runtime'

import { RouteError } from '@my-interview/common'

/**
 * Страница 404: страница не найдена.
 * @returns {JSX.Element} Элемент страницы не найдена.
 */
const Error404Page = (): JSX.Element => (
  <RouteError
    compact
    caption="Такого адреса нет. Проверьте ссылку или вернитесь на главную."
    retry={false}
    title="Страница не найдена"
    onBack={() => window.history.back()}
  />
)

export default Error404Page
