import { Styled } from './Image.styled'
import type { ImageProps } from './Image.types'

/**
 * Картинка фиксированного размера, без обрезки.
 *
 * @description
 * - С `sources` — `<picture>`: браузер берёт первый подходящий `<source>`, иначе `src`.
 * - Без `sources` — обычный `<img>`. `alt` и размеры всегда у `<img>`.
 */
export const Image = ({ alt, height, sources, src, width }: ImageProps) => {
  const image = <Styled.Component $height={height} $width={width} alt={alt} height={height} src={src} width={width} />

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
