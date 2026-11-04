export const LOCALE_KEY = 'my-interview-locale'

export type Locale = 'en' | 'ru'

export const readLocale = (): Locale => (window.localStorage.getItem(LOCALE_KEY) === 'en' ? 'en' : 'ru')
