import styled, { css } from 'styled-components'

import { belowTablet, Link, tabletOnly, textStyle } from '@my-interview/ui-kit'

const Root = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.r32}px ${({ theme }) => theme.radii.r32}px 0 0;
  box-shadow: ${({ theme }) => theme.shadows.section};
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s32}px;
  margin-top: -${({ theme }) => theme.layout.sectionOverlap}px;
  min-height: ${({ theme }) => `calc(100dvh + ${theme.layout.sectionOverlap}px)`};
  padding: ${({ theme }) => theme.spacings.s72 + theme.spacings.s64}px ${({ theme }) => theme.layout.pageGutter}px
    ${({ theme }) => theme.spacings.s96}px;
  position: relative;

  ${({ theme }) => tabletOnly(theme)} {
    padding-left: ${({ theme: next }) => next.layout.pageGutterTablet}px;
    padding-right: ${({ theme: next }) => next.layout.pageGutterTablet}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    padding: ${({ theme: next }) => next.spacings.s96}px ${({ theme: next }) => next.layout.pageGutterMobile}px
      ${({ theme: next }) => next.spacings.s96 + next.spacings.s64}px;
  }
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s12}px;
  max-width: 720px;
`

const Title = styled.h2`
  ${({ theme }) => textStyle(theme.typography.h2)}
  color: ${({ theme }) => theme.colors.textPrimary};
`

const Description = styled.p`
  ${({ theme }) => textStyle(theme.typography.bodyLg)}
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`

const Columns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s20}px;

  ${({ theme }) => belowTablet(theme)} {
    flex-direction: column;
  }
`

const Menu = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacings.s4}px;
  padding: ${({ theme }) => theme.spacings.s12}px;
  width: 280px;

  ${({ theme }) => tabletOnly(theme)} {
    width: 220px;
  }

  ${({ theme }) => belowTablet(theme)} {
    background: transparent;
    border: 0;
    flex-direction: row;
    gap: ${({ theme: next }) => next.spacings.s8}px;
    padding: 0;
    width: auto;
  }
`

const MenuItem = styled.button<{ $isActive: boolean }>`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accent : theme.colors.textSecondary)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacings.s12}px ${({ theme }) => theme.spacings.s14}px;
  text-align: left;
  width: 100%;
  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background: ${theme.colors.accentBg};
    `}

  ${({ theme }) => `@media (hover: hover) and (min-width: ${theme.breakpoints.tablet + 1}px)`} {
    &:hover {
      background: ${({ $isActive, theme }) => ($isActive ? theme.colors.accentBg : theme.colors.page)};
    }
  }

  ${({ theme }) => belowTablet(theme)} {
    flex: 1;
    height: ${({ theme: next }) => next.spacings.s48}px;
    justify-content: center;
    padding: 0;
    width: auto;
  }
`

const MenuTitle = styled.span<{ $isActive: boolean }>`
  ${({ $isActive, theme }) => textStyle($isActive ? theme.typography.bodyStrong : theme.typography.body)}
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accent : theme.colors.textPrimary)};

  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const MenuCount = styled.span<{ $isActive: boolean }>`
  ${({ theme }) => textStyle(theme.typography.caption)}
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accentDeep : theme.colors.textTertiary)};

  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const SpecialtyIcon = styled.span<{ $src: string }>`
  background-color: currentcolor;
  display: none;
  flex-shrink: 0;
  height: 22px;
  mask: url(${({ $src }) => $src}) center / contain no-repeat;
  width: 22px;

  ${({ theme }) => belowTablet(theme)} {
    display: block;
  }
`

const RoadmapMark = styled.span`
  background-color: currentcolor;
  display: block;
  flex-shrink: 0;
  height: 16px;
  mask: url('/guest/icon-roadmap.svg') center / contain no-repeat;
  width: 16px;
`

const Catalog = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s12}px;
  min-width: 0;
`

const Toolbar = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings.s12}px;
  justify-content: space-between;
`

const RoadmapLink = styled.a`
  ${({ theme }) => textStyle(theme.typography.navLink)}
  align-items: center;
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: inline-flex;
  gap: ${({ theme }) => theme.spacings.s8}px;
  margin-left: auto;
  padding: ${({ theme }) => theme.spacings.s4 + theme.spacings.s6}px
    ${({ theme }) => theme.spacings.s4 + theme.spacings.s14}px;
  text-decoration: none;

  ${({ theme }) => `@media (hover: hover) and (min-width: ${theme.breakpoints.tablet + 1}px)`} {
    &:hover {
      color: ${({ theme: next }) => next.colors.accent};
    }
  }
`

const Island = styled.div`
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  display: inline-flex;
  gap: ${({ theme }) => theme.spacings.s4}px;
  padding: ${({ theme }) => theme.spacings.s4}px;
  position: relative;
  width: fit-content;
`

const Thumb = styled.span<{ $height: number; $width: number; $x: number; $y: number }>`
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  height: ${({ $height }) => $height}px;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: ${({ $x, $y }) => `translate(${$x}px, ${$y}px)`};
  transition:
    height 220ms ease,
    transform 220ms ease,
    width 220ms ease;
  width: ${({ $width }) => $width}px;
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Segment = styled.button<{ $active: boolean }>`
  ${({ theme }) => textStyle(theme.typography.navLink)}
  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.textSecondary)};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacings.s6}px ${({ theme }) => theme.spacings.s14}px;
  position: relative;
  transition: color 220ms ease;
  z-index: 1;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const cardPx = 74

const Grid = styled.div`
  align-content: start;
  animation: specialties-in 220ms ease;
  display: grid;
  flex: 1;
  gap: ${({ theme }) => theme.spacings.s12}px;
  grid-auto-rows: ${cardPx}px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  min-height: ${({ theme }) => 8 * cardPx + 7 * theme.spacings.s12}px;

  @keyframes specialties-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${({ theme }) => tabletOnly(theme)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => belowTablet(theme)} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Card = styled(Link)`
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderCard};
  border-radius: ${({ theme }) => theme.radii.r12}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  gap: ${({ theme }) => theme.spacings.s12}px;
  height: ${cardPx}px;
  padding: ${({ theme }) => theme.spacings.s14}px;

  @media (hover: hover) and (min-width: ${({ theme }) => theme.breakpoints.tablet + 1}px) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.accentLine};
      box-shadow: ${({ theme }) => theme.shadows.cardHover};
    }
  }
`

const SoonCard = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderCard};
  border-radius: ${({ theme }) => theme.radii.r12}px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  box-sizing: border-box;
  color: inherit;
  cursor: default;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s12}px;
  height: ${cardPx}px;
  opacity: 0.55;
  padding: ${({ theme }) => theme.spacings.s14}px;
`

const Mark = styled.span`
  ${({ theme }) => textStyle(theme.typography.bodyStrong)}
  align-items: center;
  background: ${({ theme }) => theme.colors.accentBg};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ theme }) => theme.colors.accent};
  display: inline-flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  width: 40px;
`

const TechIcon = styled.img`
  display: block;
  height: 40px;
  width: 40px;
`

const TechText = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const NameRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacings.s8}px;
  min-width: 0;
`

const TechName = styled.p`
  ${({ theme }) => textStyle(theme.typography.techName)}
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Soon = styled.span`
  ${({ theme }) => textStyle(theme.typography.caption)}
  background: ${({ theme }) => theme.colors.dangerBg};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.danger};
  flex-shrink: 0;
  font-size: 11px;
  line-height: 16px;
  padding: 1px ${({ theme }) => theme.spacings.s6}px;
`

const MenuSoon = styled(Soon)`
  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const Fresh = styled.span`
  ${({ theme }) => textStyle(theme.typography.caption)}
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
  font-size: 11px;
  line-height: 16px;
  padding: 1px ${({ theme }) => theme.spacings.s6}px;
`

const TechCount = styled.p`
  ${({ theme }) => textStyle(theme.typography.caption)}
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
`

const Action = styled.span`
  align-items: center;
  background: ${({ theme }) => theme.colors.actionCell};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  display: inline-flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`

const Chevron = styled.img`
  display: block;
  height: 16px;
  width: 16px;
`

export {
  Action,
  Card,
  SoonCard,
  Catalog,
  Chevron,
  Columns,
  Description,
  Fresh,
  Grid,
  Heading,
  Island,
  Mark,
  Menu,
  MenuCount,
  MenuItem,
  MenuSoon,
  MenuTitle,
  RoadmapLink,
  RoadmapMark,
  Toolbar,
  SpecialtyIcon,
  NameRow,
  Root,
  Soon,
  Segment,
  TechCount,
  TechIcon,
  TechName,
  TechText,
  Thumb,
  Title,
}
