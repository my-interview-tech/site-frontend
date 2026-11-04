import { useRef } from 'react'

import { useCarousel, useLottieAnimation } from '../hooks'
import { SlideItem } from './SlideItem'
import { Styled } from './styled'

/**
 * Главный экран: карусель слайдов с призывом.
 * @access private
 * @todo вынести в ui-kit
 */
export const MainScreen = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { slide, slideIndex, prevIndex, changeSlide } = useCarousel()

  const frames = [
    ...(prevIndex !== null && prevIndex !== slideIndex ? [{ index: prevIndex, isLeaving: true }] : []),
    { index: slideIndex, isLeaving: false },
  ]

  useLottieAnimation(ref)

  return (
    <Styled.Container
      relatively
      data-nav-surface="hero"
      data-snap-section=""
      flexDirection="column"
      flexShrink={0}
      forwardedAs="section"
      id="home-hero"
    >
      <Styled.Orb $size={400} $top={-40} $left={900} $opacity={0.25} />
      <Styled.Orb $size={300} $top={200} $left={1050} $opacity={0.15} />
      <Styled.Orb $size={250} $top={350} $left={700} $opacity={0.1} />
      <Styled.Mesh ref={ref} />

      <Styled.Stage>
        {frames.map(({ index, isLeaving }) => (
          <Styled.Slide
            key={index}
            $entering={!isLeaving && prevIndex !== null}
            $leaving={isLeaving}
            alignItems="stretch"
            flexDirection="column"
            gap={24}
            tablet={{
              alignItems: 'center',
              fillHeight: true,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <SlideItem index={index} />
          </Styled.Slide>
        ))}
      </Styled.Stage>

      <Styled.Steps gap={12} tablet={{ gap: 20 }}>
        {slide.steps.map((label, idx) => {
          const isActive = idx === slideIndex
          const isDone = idx < slideIndex

          return (
            <Styled.Step
              aria-label={label}
              flex="1"
              flexDirection="column"
              forwardedAs="button"
              gap={8}
              key={label}
              p={0}
              tablet={{ flex: '0 0 170px', width: 170 }}
              type="button"
              onClick={() => changeSlide(idx)}
            >
              <Styled.Track $isDone={isDone} $isUpcoming={!isActive && !isDone}>
                <Styled.Progress key={slideIndex} $isActive={isActive} $isDone={isDone} />
              </Styled.Track>

              <Styled.StepLabel $isActive={isActive} $isDone={isDone}>
                {label}
              </Styled.StepLabel>
            </Styled.Step>
          )
        })}
      </Styled.Steps>
    </Styled.Container>
  )
}
