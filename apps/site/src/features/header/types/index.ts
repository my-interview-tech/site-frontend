export type NavLink = {
  href?: string
  label: string
  sectionId?: string
}

export type NavColumn = {
  links: NavLink[]
  title: string
}

export type NavItem = NavColumn | NavLink
