import type { ComponentPropsWithoutRef } from 'react'

import type { WithBreakpoints } from '../../lib/withBreakpoints'

export type ImageSource = {
  /**
   * Медиа-запрос, при котором берётся источник, например `(max-width: 768px)`.
   */
  media?: string

  /**
   * Адреса с дескрипторами, например `hero.avif 1x, hero@2x.avif 2x`.
   */
  srcSet: string

  /**
   * MIME-тип формата, например `image/avif` или `image/webp`.
   */
  type?: string
}

/** Как вписать картинку в заданный прямоугольник. */
export type ImageFit = 'contain' | 'cover'

/**
 * Размер и кадрирование. Число — px, строка — CSS как есть.
 */
export interface ImageStyle {
  /**
   * Ширина.
   */
  width?: number | string

  /**
   * Высота.
   */
  height?: number | string

  /**
   * Минимальная ширина.
   */
  minWidth?: number | string

  /**
   * Максимальная ширина.
   */
  maxWidth?: number | string

  /**
   * Максимальная высота.
   */
  maxHeight?: number | string

  /**
   * Пропорция, например `512 / 394`.
   */
  aspectRatio?: string

  /**
   * Как вписать картинку.
   * @default `contain`
   */
  fit?: ImageFit

  /**
   * Точка кадра, например `right center`.
   */
  objectPosition?: string

  /**
   * Скругление. Число — px.
   */
  radius?: number | string
}

/** База с 0px, ключ брейкпоинта перекрывает её с его ширины. */
export type ImageLayout = WithBreakpoints<ImageStyle>

interface ImageOwnProps extends ImageLayout {
  /**
   * Адрес fallback-файла. Его берёт браузер, если ни один источник не подошёл.
   */
  src: string

  /**
   * Альтернативный текст. Пустая строка — картинка декоративная.
   */
  alt: string

  /**
   * Ширина. Число — px и атрибут `<img>`, строка — только CSS.
   */
  width: number | string

  /**
   * Высота. Число — px и атрибут `<img>`, строка — только CSS.
   */
  height: number | string

  /**
   * Источники для `<picture>` по порядку предпочтения. Без них рендерится обычный `<img>`.
   */
  sources?: ImageSource[]
}

export type ImageProps = ImageOwnProps & Omit<ComponentPropsWithoutRef<'img'>, keyof ImageOwnProps | 'srcSet'>
