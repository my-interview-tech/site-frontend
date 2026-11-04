export const loginUrl = '/login'
export const checkoutUrl = '/login?intent=checkout'

export const externalLinks = {
  discord: '',
  googlePlay: '',
  max: '',
  offer: '',
  privacy: '',
  rusprofile: 'https://www.rusprofile.ru/ip/325237500082552',
  rustore: '',
  telegram: '',
  vk: '',
} as const

export const asset = (fileName: string): string => `/guest/${fileName}`

export const supportChatId = 'support-chat'

export const navBarPx = 64
export const sectionPinPx = 0

export const sectionOverlapPx = 32
