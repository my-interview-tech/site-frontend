import { useEffect, useRef, useState } from 'react'

import { Markdown, ResourceCard } from '@my-interview/common'
import { Carousel, Flex, IconButton, Link, Text, Title, theme, useBreakpoint } from '@my-interview/ui-kit'

import { INTERVAL_MS, TEXT, WINDOW_SIZE } from '../constants'
import type { ArticleBodyProps } from '../types'
import { Styled } from './styled'

/**
 * Блок тела статьи: текст, материалы и соседние статьи.
 */
export const ArticleBody = ({ markdown, paywall, resources = [], previousStep, nextStep }: ArticleBodyProps) => {
  const { breakpoint } = useBreakpoint()
  const isCompact = breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktopXS'
  const visible = isCompact ? 1 : WINDOW_SIZE

  const slotRef = useRef<HTMLDivElement>(null)
  const pagerRef = useRef<HTMLDivElement>(null)
  const dockedHeightRef = useRef(0)
  const [isFloating, setIsFloating] = useState(false)
  const [reserved, setReserved] = useState(0)

  useEffect(() => {
    const slot = slotRef.current

    if (!isCompact || !slot) {
      setIsFloating(false)
      setReserved(0)

      return undefined
    }

    let frame = 0

    const sync = () => {
      const { bottom, top } = slot.getBoundingClientRect()
      const pager = pagerRef.current
      const fixed = pager ? getComputedStyle(pager).position === 'fixed' : false

      if (pager && !fixed) {
        dockedHeightRef.current = pager.offsetHeight
      }

      const docked = dockedHeightRef.current
      const floating = docked > 0 && (top < 0 || bottom > window.innerHeight)

      setIsFloating((current) => (current === floating ? current : floating))
      setReserved((current) => (current === docked ? current : docked))
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sync)
    }

    const observer = new IntersectionObserver(schedule)

    observer.observe(slot)
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    document.addEventListener('scroll', schedule, { passive: true, capture: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      document.removeEventListener('scroll', schedule, { capture: true })
      window.removeEventListener('resize', schedule)
    }
  }, [isCompact, nextStep, previousStep])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s24} style={{ minWidth: 0 }}>
      <Markdown>{markdown}</Markdown>

      {/* TODO: Добавить эффект затемнения для закрытой части статьи */}
      {paywall}

      {resources.length > 0 && (
        <Styled.Resources
          flexDirection="column"
          forwardedAs="section"
          gap={theme.spacings.s16}
          id="resources"
          p={theme.spacings.s20}
        >
          <Title size={700} title={TEXT.RESOURCES_TITLE} titleAs="h2" />

          <Carousel
            getDotLabel={(index) => `Материалы, страница ${index + 1}`}
            interval={INTERVAL_MS}
            items={resources}
            renderItem={(props) => <ResourceCard {...props} />}
            visible={visible}
          />
        </Styled.Resources>
      )}

      <Styled.Slot ref={slotRef} $height={isFloating ? reserved : 0}>
        <Styled.Pager
          ref={pagerRef}
          $floating={isFloating}
          alignItems="center"
          flexDirection="row"
          forwardedAs="nav"
          gap={theme.spacings.s16}
          justifyContent="space-between"
          desktopS={{ alignItems: 'flex-start' }}
        >
          {previousStep && (
            <Styled.PageLink
              $align="left"
              alignItems="center"
              flex="1 1 0"
              forwardedAs={Link}
              gap={theme.spacings.s14}
              href={previousStep.href}
              desktopS={{ flex: '0 1 auto' }}
            >
              <IconButton
                aria-hidden
                as="span"
                iconDirection="left"
                iconSrc="icon-chevron"
                label={TEXT.PREVIOUS_STEP}
                size={32}
              />

              <Flex flexDirection="column" gap={theme.spacings.s4}>
                <Text
                  as="span"
                  color={isCompact ? theme.colors.textPrimary : theme.colors.textTertiary}
                  font={isCompact ? 400 : 200}
                  weight={isCompact ? 'semibold' : undefined}
                >
                  {TEXT.PREVIOUS_STEP}
                </Text>
                {!isCompact && (
                  <Text as="span" color={theme.colors.textPrimary} font={500} weight="semibold">
                    {previousStep.title}
                  </Text>
                )}
              </Flex>
            </Styled.PageLink>
          )}

          {nextStep && (
            <Styled.PageLink
              $align="right"
              alignItems="center"
              flex="1 1 0"
              forwardedAs={Link}
              gap={theme.spacings.s14}
              href={nextStep.href}
              justifyContent="flex-end"
              desktopS={{ flex: '0 1 auto', justifyContent: 'flex-start' }}
            >
              <Flex flexDirection="column" gap={theme.spacings.s4}>
                <Text
                  as="span"
                  color={isCompact ? theme.colors.textPrimary : theme.colors.textTertiary}
                  font={isCompact ? 400 : 200}
                  weight={isCompact ? 'semibold' : undefined}
                >
                  {TEXT.NEXT_STEP}
                </Text>
                {!isCompact && (
                  <Text as="span" color={theme.colors.textPrimary} font={500} weight="semibold">
                    {nextStep.title}
                  </Text>
                )}
              </Flex>

              <IconButton aria-hidden as="span" iconSrc="icon-chevron" label={TEXT.NEXT_STEP} size={32} />
            </Styled.PageLink>
          )}
        </Styled.Pager>
      </Styled.Slot>
    </Flex>
  )
}
