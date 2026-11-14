import { useEffect, useState } from 'react'
import type { TransitionEvent } from 'react'

import { useReducedMotion } from '../../hooks/useReducedMotion'
import { theme } from '../../theme/theme'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { DEFAULT_INTERVAL_MS, getDefaultDotLabel, TEXT } from './Carousel.constants'
import { Styled } from './Carousel.styled'
import type { CarouselProps } from './Carousel.types'

/**
 * Карусель карточек с бесконечной прокруткой.
 *
 * @description
 * - Карточек больше `visible`: стрелки, точки и автопрокрутка с паузой при наведении.
 * - Карточек не больше `visible`: карусель стоит, карточки по центру.
 */
export const Carousel = <T extends { id: string }>({
  getDotLabel = getDefaultDotLabel,
  interval = DEFAULT_INTERVAL_MS,
  items,
  renderItem,
  visible,
}: CarouselProps<T>) => {
  const count = items.length
  const safeVisible = Math.max(visible, 1)
  const [index, setIndex] = useState(0)
  const [isAnimated, setIsAnimated] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const isReduced = useReducedMotion()
  const isLooping = count > safeVisible
  const slides = isLooping ? [...items, ...items.slice(0, safeVisible)] : items
  const activeDot = count === 0 ? 0 : index % count

  useEffect(() => {
    setIsAnimated(false)
    setIndex(0)
  }, [safeVisible])

  useEffect(() => {
    if (isReduced || isAnimated || index !== count || count === 0) {
      return undefined
    }

    let inner = 0
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setIsAnimated(true)
        setIndex(count - 1)
      })
    })

    return () => {
      window.cancelAnimationFrame(outer)
      window.cancelAnimationFrame(inner)
    }
  }, [count, index, isAnimated, isReduced])

  useEffect(() => {
    if (isPaused || isReduced || !isLooping) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setIsAnimated(true)
      setIndex((current) => (current >= count ? current : current + 1))
    }, interval)

    return () => {
      window.clearInterval(timer)
    }
  }, [count, interval, isLooping, isPaused, isReduced])

  const showNext = () => {
    if (isReduced) {
      setIsAnimated(false)
      setIndex((current) => (current + 1) % count)

      return
    }

    setIsAnimated(true)
    setIndex((current) => (current >= count ? current : current + 1))
  }

  const showPrevious = () => {
    if (isReduced) {
      setIsAnimated(false)
      setIndex((current) => (current - 1 + count) % count)

      return
    }

    if (index === 0) {
      setIsAnimated(false)
      setIndex(count)

      return
    }

    setIsAnimated(true)
    setIndex((current) => current - 1)
  }

  const showDot = (dotIndex: number) => {
    setIsAnimated(!isReduced)
    setIndex(dotIndex)
  }

  const settle = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || index < count) {
      return
    }

    setIsAnimated(false)
    setIndex(0)
  }

  if (!count) {
    return null
  }

  return (
    <Flex
      flexDirection="column"
      gap={theme.spacings.s12}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Styled.Row alignItems="center" gap={theme.spacings.s8}>
        {isLooping && (
          <Styled.Arrow aria-label={TEXT.PREVIOUS} onClick={showPrevious}>
            <Icon isMonochrome direction="left" iconSrc="icon-chevron" />
          </Styled.Arrow>
        )}

        <Styled.Cards flex={1}>
          <Styled.Track
            fillWidth
            $index={isLooping ? index : 0}
            $isAnimated={isAnimated && !isReduced}
            $visible={safeVisible}
            gap={theme.spacings.s16}
            justifyContent={isLooping ? 'flex-start' : 'center'}
            onTransitionEnd={settle}
          >
            {slides.map((item, slideIndex) => (
              <Styled.Slot key={`${item.id}-${slideIndex}`} $visible={safeVisible}>
                {renderItem(item)}
              </Styled.Slot>
            ))}
          </Styled.Track>
        </Styled.Cards>

        {isLooping && (
          <Styled.Arrow aria-label={TEXT.NEXT} onClick={showNext}>
            <Icon isMonochrome iconSrc="icon-chevron" />
          </Styled.Arrow>
        )}
      </Styled.Row>

      {isLooping && (
        <Flex gap={theme.spacings.s6} justifyContent="center">
          {items.map((item, dotIndex) => (
            <Styled.Dot
              key={item.id}
              $isActive={dotIndex === activeDot}
              aria-current={dotIndex === activeDot || undefined}
              aria-label={getDotLabel(dotIndex)}
              onClick={() => showDot(dotIndex)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
