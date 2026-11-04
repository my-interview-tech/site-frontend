import { sectionHref } from '@shared/lib'

export const getLogoHref = (pathname: string, isAuth: boolean): string => {
  if (!isAuth && pathname.startsWith('/topics')) {
    return sectionHref(pathname, 'specialties')
  }

  return '/'
}
