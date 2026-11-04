import type { Crumb } from '@my-interview/ui-kit'

import { sectionHref } from '../section-href'

type CrumbItem = {
  href?: string
  label: string
}

/** Цепочка крошек. Пункт без адреса — текущая страница. */
export const crumbs = (items: readonly CrumbItem[]): Crumb[] =>
  items.map((item) => (item.href ? { href: item.href, label: item.label } : { label: item.label }))

export const home = (): Crumb => ({ href: sectionHref('/topics', 'specialties'), label: 'Главная' })

export const topic = (tech: string, title: string): Crumb => ({ href: `/topics/${tech}`, label: title })
