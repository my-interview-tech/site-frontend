import type { Cut, Joint } from './types'

const RADIUS = 8

/** Зазор ствола вокруг карточки, px. */
export const GAP = 16
/** Ширина ствола, px. */
export const TRUNK = 22

const round = (value: number) => Math.round(value * 10) / 10

/** Отрезки вертикального ствола между вырезами карточек. */
export const spinePaths = (height: number, x: number, cuts: readonly Cut[], gap: number): readonly string[] => {
  const expanded = cuts
    .map((cut) => ({ bottom: cut.bottom + gap, top: cut.top - gap }))
    .filter((cut) => cut.bottom > 0 && cut.top < height)
    .sort((left, right) => left.top - right.top)
  const merged = expanded.reduce<Cut[]>((list, cut) => {
    const last = list[list.length - 1]

    if (last && cut.top <= last.bottom) {
      return [...list.slice(0, -1), { bottom: Math.max(last.bottom, cut.bottom), top: last.top }]
    }

    return [...list, cut]
  }, [])
  const lines: string[] = []
  let cursor = 0

  merged.forEach((cut) => {
    const start = Math.max(cut.top, 0)

    if (start - cursor > 4) {
      lines.push(`M ${round(x)} ${round(cursor)} V ${round(start)}`)
    }

    cursor = Math.max(cursor, cut.bottom)
  })

  if (height - cursor > 4) {
    lines.push(`M ${round(x)} ${round(cursor)} V ${round(height)}`)
  }

  return lines
}

/** Путь от боковых карточек к стволу. */
export const branchPath = (joints: readonly Joint[], trunkX: number): string => {
  const points = [...joints].sort((left, right) => left.y - right.y)
  const first = points[0]
  const last = points[points.length - 1]

  if (!first || !last) {
    return ''
  }

  if (points.length === 1) {
    return `M ${round(first.edge)} ${round(first.y)} H ${round(trunkX)}`
  }

  const sign = first.edge > trunkX ? 1 : -1
  const reach = Math.min(...points.map((point) => Math.abs(point.edge - trunkX)))
  const radius = Math.min(RADIUS, (last.y - first.y) / 2, reach / 2)
  const sweep = sign > 0 ? 0 : 1
  const elbow = (x: number, y: number) => `A ${round(radius)} ${round(radius)} 0 0 ${sweep} ${round(x)} ${round(y)}`
  const trunk = [
    `M ${round(first.edge)} ${round(first.y)}`,
    `H ${round(trunkX + sign * radius)}`,
    elbow(trunkX, first.y + radius),
    `V ${round(last.y - radius)}`,
    elbow(trunkX + sign * radius, last.y),
    `H ${round(last.edge)}`,
  ]
  const middles = points.slice(1, -1).map((point) => `M ${round(point.edge)} ${round(point.y)} H ${round(trunkX)}`)

  return [...trunk, ...middles].join(' ')
}

/** Горизонтальный отрезок развилки. */
export const forkPath = (fromX: number, toX: number, y: number) => {
  if (Math.abs(fromX - toX) < 1) {
    return ''
  }

  return `M ${round(fromX)} ${round(y)} H ${round(toX)}`
}
