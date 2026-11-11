import styled, { css, keyframes } from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'
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
  background: ${theme.colors.hero};
  min-height: 100dvh;
  overflow: hidden;
  padding: ${theme.spacings.s64 + theme.spacings.s48}px ${theme.container.paddingMobile}px ${theme.spacings.s48}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    min-height: 100vh;
    padding: ${theme.spacings.s80}px ${theme.container.paddingTablet}px ${theme.spacings.s96}px;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    padding-left: ${theme.container.padding}px;
    padding-right: ${theme.container.padding}px;
  }
`

/** @description Обертка для анимации */
const Orb = styled.span<{ $left: number; $opacity: number; $size: number; $top: number }>`
  background: ${theme.colors.white};
  border-radius: ${theme.radii.rPill}px;
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
  min-height: auto;
  position: relative;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    min-height: 0;
  }

  > * {
    grid-area: 1 / 1;
  }
`

const Slide = styled(Flex)<{ $entering: boolean; $leaving: boolean }>`
  height: auto;
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
`

const Steps = styled(Flex)`
  margin-top: ${theme.spacings.s24}px;
  position: static;
  width: 100%;
  z-index: 2;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    bottom: ${theme.spacings.s96 + theme.spacings.s48}px;
    left: ${theme.container.paddingTablet}px;
    margin-top: 0;
    position: absolute;
    width: auto;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    left: ${theme.container.padding}px;
  }
`

const Step = styled(Flex)`
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
`

const Track = styled.span<{ $isDone: boolean; $isUpcoming: boolean }>`
  background: ${({ $isDone, $isUpcoming }) => {
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
  background: ${theme.colors.white};
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
  ${({ $isActive }) => textStyle(200, { weight: $isActive ? 'semibold' : 'medium' })}
  color: ${({ $isActive, $isDone }) => {
    if ($isActive) {
      return theme.colors.white
    }

    if ($isDone) {
      return theme.colors.textOnHeroTrack
    }

    return theme.colors.textOnHeroSoft
  }};
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: inline;
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
