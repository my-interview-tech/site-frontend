import { Children, type ReactNode } from 'react'

import { anchorPattern } from './AnchorHeading.constants'

/**
 * Отделяет якорь `{#id}` в конце заголовка.
 *
 * @description Якорь ищется в последнем текстовом узле. Без него `id` пустой, а `children` не меняются. Найденный хвост из текста убирается, пустой узел отбрасывается.
 */
export const splitAnchor = (children: ReactNode): { children: ReactNode; id?: string } => {
  const nodes = Children.toArray(children)
  const last = nodes.at(-1)

  if (typeof last !== 'string') {
    return { children, id: undefined }
  }

  const match = anchorPattern.exec(last)

  if (!match) {
    return { children, id: undefined }
  }

  const text = last.slice(0, match.index)
  const content = text ? [...nodes.slice(0, -1), text] : nodes.slice(0, -1)

  return { children: content, id: match[1] }
}
