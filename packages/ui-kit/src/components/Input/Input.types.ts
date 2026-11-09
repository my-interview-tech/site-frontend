import type { ComponentPropsWithoutRef } from 'react'

export type InputOwnProps = {
  /**
   * Имя поля для скринридера: у поля нет видимой подписи.
   */
  label: string

  /**
   * Значение.
   */
  value: string

  /**
   * Событие "изменить значение".
   */
  onChange: (value: string) => void
}

export interface InputProps
  extends InputOwnProps,
    Omit<ComponentPropsWithoutRef<'input'>, keyof InputOwnProps | 'children' | 'size'> {}
