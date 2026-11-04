import { useLayoutEffect, useRef, useState } from 'react'

import { specialties, specialtiesCopy, specialtyIcon } from './content'
import {
  Action,
  Card,
  Catalog,
  SoonCard,
  Chevron,
  Columns,
  Description,
  Grid,
  Fresh,
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
  NameRow,
  Root,
  Segment,
  Soon,
  SpecialtyIcon,
  TechCount,
  TechIcon,
  TechName,
  TechText,
  Thumb,
  Title,
} from './Specialties.styled'

const guest = (fileName: string) => `/guest/${fileName}`

const roadmapTrackOf: Record<string, string> = {
  Backend: 'backend',
  DevOps: 'devops',
  Frontend: 'frontend',
  QA: 'qa',
  'System Analytic': 'analytic',
}

const roadmapHref = (title: string): string => {
  const track = roadmapTrackOf[title]

  return track ? `/topics?track=${track}` : '/topics'
}

type ThumbBox = {
  height: number
  width: number
  x: number
  y: number
}

const emptyThumb: ThumbBox = { height: 0, width: 0, x: 0, y: 0 }

const thumbOf = (root: HTMLElement): ThumbBox => {
  const current = root.querySelector<HTMLElement>('[aria-selected="true"]')

  if (!current) {
    return emptyThumb
  }

  const rootBox = root.getBoundingClientRect()
  const box = current.getBoundingClientRect()

  return {
    height: box.height,
    width: box.width,
    x: box.left - rootBox.left,
    y: box.top - rootBox.top,
  }
}

const SpecialtyGlyph = ({ title }: { readonly title: string }) => (
  <SpecialtyIcon aria-hidden $src={specialtyIcon[title] ?? specialtyIcon.Frontend} />
)

/**
 * Каталог специальностей и технологий.
 */
const Specialties = () => {
  const [activeTitle, setActiveTitle] = useState(specialties[0]?.title ?? '')

  const [trackId, setTrackId] = useState<string | null>(null)
  const active = specialties.find((item) => item.title === activeTitle) ?? specialties[0]
  const track = active?.tracks?.find((item) => item.id === trackId) ?? active?.tracks?.[0]
  const tech = track?.tech ?? active?.tech ?? []
  const href = active ? roadmapHref(active.title) : undefined
  const islandRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<ThumbBox>(emptyThumb)

  useLayoutEffect(() => {
    const root = islandRef.current

    if (!root) {
      return undefined
    }

    const place = () => {
      const next = thumbOf(root)

      setThumb((current) =>
        current.x === next.x && current.y === next.y && current.width === next.width && current.height === next.height
          ? current
          : next
      )
    }

    place()
    const observer = new ResizeObserver(place)

    observer.observe(root)

    return () => observer.disconnect()
  }, [active?.title, track?.id])

  return (
    <Root data-footer-snap="" data-nav-surface="white" data-snap-section="" id="specialties">
      <Heading>
        <Title>{specialtiesCopy.title}</Title>
        <Description>{specialtiesCopy.description}</Description>
      </Heading>
      <Columns>
        <Menu>
          {specialties.map((item) => {
            const isActive = !item.soon && item.title === active?.title

            return (
              <MenuItem
                key={item.title}
                $isActive={isActive}
                aria-disabled={item.soon}
                aria-label={item.soon ? `${item.title}, ${specialtiesCopy.soon}` : item.title}
                type="button"
                onClick={() => {
                  if (item.soon) {
                    return
                  }

                  setActiveTitle(item.title)
                }}
              >
                <SpecialtyGlyph title={item.title} />
                <MenuTitle $isActive={isActive}>{item.title}</MenuTitle>
                {item.soon ? (
                  <MenuSoon>{specialtiesCopy.soon}</MenuSoon>
                ) : (
                  <MenuCount $isActive={isActive}>{item.count}</MenuCount>
                )}
              </MenuItem>
            )
          })}
        </Menu>
        <Catalog>
          {active?.tracks || href ? (
            <Toolbar>
              {active?.tracks ? (
                <Island key={active.title} ref={islandRef} role="tablist">
                  {thumb.width > 0 ? (
                    <Thumb $height={thumb.height} $width={thumb.width} $x={thumb.x} $y={thumb.y} />
                  ) : null}
                  {active.tracks?.map((item) => (
                    <Segment
                      key={item.id}
                      $active={item.id === track?.id}
                      aria-selected={item.id === track?.id}
                      role="tab"
                      type="button"
                      onClick={() => setTrackId(item.id)}
                    >
                      {item.title}
                    </Segment>
                  ))}
                </Island>
              ) : null}
              {href ? (
                <RoadmapLink aria-label={`${specialtiesCopy.roadmap}: ${active?.title}`} href={href}>
                  <RoadmapMark aria-hidden />
                  {specialtiesCopy.roadmap}
                </RoadmapLink>
              ) : null}
            </Toolbar>
          ) : null}
          <Grid key={`${active?.title ?? ''}:${track?.id ?? ''}`}>
            {tech.map((item) => {
              const body = (
                <>
                  {item.icon ? (
                    <TechIcon alt="" height={40} src={guest(item.icon)} width={40} />
                  ) : (
                    <Mark>{item.title.slice(0, 1)}</Mark>
                  )}
                  <TechText>
                    <NameRow>
                      <TechName>{item.title}</TechName>
                      {item.soon ? <Soon>{specialtiesCopy.soon}</Soon> : null}
                      {item.isNew ? <Fresh>{specialtiesCopy.fresh}</Fresh> : null}
                    </NameRow>
                    <TechCount>{item.count}</TechCount>
                  </TechText>
                  <Action>
                    <Chevron alt="" height={16} src={guest('chevron-right.svg')} width={16} />
                  </Action>
                </>
              )

              if (item.soon) {
                return (
                  <SoonCard key={item.title} aria-disabled="true">
                    {body}
                  </SoonCard>
                )
              }

              return (
                <Card key={item.title} href={`/topics/${item.slug}`}>
                  {body}
                </Card>
              )
            })}
          </Grid>
        </Catalog>
      </Columns>
    </Root>
  )
}

export { Specialties }
