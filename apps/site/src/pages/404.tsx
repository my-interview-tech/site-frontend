import type { JSX } from 'react/jsx-runtime'
import { NotFound } from '@my-interview/common'

/**
 * Страница 404: страница не найдена.
 * @returns {JSX.Element} Элемент страницы не найдена.
 */
const Error404Page = (): JSX.Element => <NotFound />

export default Error404Page
