import styled, { css, keyframes } from 'styled-components'

import { belowTablet, Flex, tabletOnly, textStyle } from '@my-interview/ui-kit'
import { slideDurationMs, slideMotionMs } from '../constants'

const fillTrack = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-24px, 0, 0);
  }
`

const Container = styled(Flex)`
  background: ${({ theme }) => theme.colors.hero};
  min-height: 100vh;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacings.s80}px ${({ theme }) => theme.layout.pageGutter}px
    ${({ theme }) => theme.spacings.s96}px;

  ${({ theme }) => tabletOnly(theme)} {
    padding-left: ${({ theme: next }) => next.layout.pageGutterTablet}px;
    padding-right: ${({ theme: next }) => next.layout.pageGutterTablet}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    min-height: 100dvh;
    padding: ${({ theme: next }) => next.spacings.s64 + next.spacings.s48}px
      ${({ theme: next }) => next.layout.pageGutterMobile}px ${({ theme: next }) => next.spacings.s48}px;
  }
`

/** @description Обертка для анимации */
const Orb = styled.span<{ $left: number; $opacity: number; $size: number; $top: number }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  filter: blur(40px);
  height: ${({ $size }) => $size}px;
  left: ${({ $left }) => $left}px;
  opacity: ${({ $opacity }) => $opacity};
  position: absolute;
  top: ${({ $top }) => $top}px;
  width: ${({ $size }) => $size}px;
`

/** @description Фон анимации */
const Mesh = styled.div`
  inset: 0;
  opacity: 0.62;
  pointer-events: none;
  position: absolute;

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`

const Stage = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  position: relative;

  > * {
    grid-area: 1 / 1;
  }

  ${({ theme }) => belowTablet(theme)} {
    min-height: auto;
  }
`

const Slide = styled(Flex)<{ $entering: boolean; $leaving: boolean }>`
  min-height: 0;
  pointer-events: ${({ $leaving }) => ($leaving ? 'none' : 'auto')};
  ${({ $entering, $leaving }) => {
    if ($leaving) {
      return css`
        animation: ${fadeOut} ${slideMotionMs}ms cubic-bezier(0.22, 1, 0.36, 1) both;
      `
    }

    if ($entering) {
      return css`
        animation: ${fadeIn} ${slideMotionMs}ms cubic-bezier(0.22, 1, 0.36, 1) both;
      `
    }

    return css`
      animation: none;
    `
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${({ $leaving }) => ($leaving ? 0 : 1)};
  }

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
  }
`

const Steps = styled(Flex)`
  bottom: ${({ theme }) => theme.spacings.s96 + theme.spacings.s48}px;
  left: ${({ theme }) => theme.layout.pageGutter}px;
  position: absolute;
  z-index: 2;

  ${({ theme }) => tabletOnly(theme)} {
    left: ${({ theme: next }) => next.layout.pageGutterTablet}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    margin-top: ${({ theme: next }) => next.spacings.s24}px;
    position: static;
    width: 100%;
  }
`

const Step = styled(Flex)`
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;

  ${({ theme }) => belowTablet(theme)} {
    min-width: 0;
  }
`

const Track = styled.span<{ $isDone: boolean; $isUpcoming: boolean }>`
  background: ${({ $isDone, $isUpcoming, theme }) => {
    if ($isUpcoming) {
      return theme.colors.heroGlass
    }

    if ($isDone) {
      return theme.colors.heroTrackDone
    }

    return theme.colors.heroTrack
  }};
  border-radius: 1px;
  display: block;
  height: 2px;
  overflow: hidden;
`

const Progress = styled.span<{ $isActive: boolean; $isDone: boolean }>`
  animation: ${({ $isActive }) => ($isActive ? fillTrack : 'none')} ${slideDurationMs}ms linear forwards;
  background: ${({ theme }) => theme.colors.white};
  display: block;
  height: 2px;
  transform: scaleX(${({ $isDone }) => ($isDone ? 1 : 0)});
  transform-origin: left center;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scaleX(${({ $isActive, $isDone }) => ($isActive || $isDone ? 1 : 0)});
  }
`

const StepLabel = styled.span<{ $isActive: boolean; $isDone: boolean }>`
  ${({ $isActive, theme }) => textStyle($isActive ? theme.typography.timelineActive : theme.typography.timeline)}
  color: ${({ $isActive, $isDone, theme }) => {
    if ($isActive) {
      return theme.colors.white
    }

    if ($isDone) {
      return theme.colors.textOnHeroTrack
    }

    return theme.colors.textOnHeroSoft
  }};

  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

export const Styled = {
  Container,
  Mesh,
  Orb,
  Progress,
  Slide,
  Stage,
  Step,
  StepLabel,
  Steps,
  Track,
}
