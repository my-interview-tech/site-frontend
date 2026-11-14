import { useCallback, useEffect, useRef, useState } from 'react'

import { COPIED_TIMEOUT } from './CodeBlock.constants'

/**
 * Хук для копирования текста в буфер и отображения состояния копирования.
 */
export const useCopy = (text: string): { copy: () => void; isCopied: boolean } => {
  const [isCopied, setIsCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(() => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        clearTimeout(timer.current)
        setIsCopied(true)
        timer.current = setTimeout(() => setIsCopied(false), COPIED_TIMEOUT)
      })
      .catch(() => undefined)
  }, [text])

  return { copy, isCopied }
}
