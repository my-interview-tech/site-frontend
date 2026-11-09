import { isNumber } from '../../lib/isNumber'
import { Styled } from './Image.styled'
import type { ImageLayout, ImageProps } from './Image.types'

/**
 * Картинка: иллюстрация, фото или файл по произвольному адресу.
 *
 * @description
 * - С `sources` — `<picture>`: браузер берёт первый подходящий `<source>`, иначе `src`.
 * - Без `sources` — обычный `<img>`.
 * - Числовые `width` и `height` попадают в атрибуты `<img>`. Строка задаёт только CSS.
 * - База действует с 0px. Ключ брейкпоинта перекрывает её с его ширины.
 */
export const Image = ({
  alt,
  aspectRatio,
  desktopL,
  desktopM,
  desktopS,
  desktopXL,
  desktopXS,
  fit,
  height,
  maxHeight,
  maxWidth,
  minWidth,
  objectPosition,
  radius,
  sources,
  src,
  tablet,
  width,
  ...rest
}: ImageProps) => {
  const layout: ImageLayout = {
    aspectRatio,
    desktopL,
    desktopM,
    desktopS,
    desktopXL,
    desktopXS,
    fit,
    height,
    maxHeight,
    maxWidth,
    minWidth,
    objectPosition,
    radius,
    tablet,
    width,
  }
  const nativeSize = isNumber(width) && isNumber(height) ? { height, width } : {}
  const image = <Styled.Component {...rest} {...nativeSize} $layout={layout} alt={alt} src={src} />

  if (!sources?.length) {
    return image
  }

  return (
    <Styled.Picture>
      {sources.map(({ media, srcSet, type }) => (
        <source key={`${srcSet}-${media ?? ''}`} media={media} srcSet={srcSet} type={type} />
      ))}
      {image}
    </Styled.Picture>
  )
}
