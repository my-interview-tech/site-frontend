export const isAuthPath = (pathname: string): boolean =>
  pathname === '/login' ||
  pathname === '/register' ||
  pathname === '/reset-password' ||
  pathname === '/forgot-password' ||
  pathname.startsWith('/forgot-password/')
