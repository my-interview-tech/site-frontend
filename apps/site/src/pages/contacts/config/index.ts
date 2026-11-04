import { asset, externalLinks } from '@shared/constants'
import type { InfoPageContract } from '@shared/ui/info-page'

export const DATA_TEXT: InfoPageContract = {
  TITLE: 'Контакты',
  DESCRIPTION: 'Свяжитесь с нами, если у вас есть вопросы или предложения.',
  BLOCKS: [
    // ? Канала в Telegram нет.
    // {
    //   TITLE: 'Telegram',
    //   LINES: [{ TEXT: 'Напишите в Telegram ↗', HREF: externalLinks.telegram }],
    // },
    // ? Канала в Discord нет.
    // {
    //   TITLE: 'Discord',
    //   LINES: [{ TEXT: 'Напишите в Discord ↗', HREF: externalLinks.discord }],
    // },
    {
      TITLE: 'Реквизиты',
      LINES: [
        { TEXT: 'ИП Калушко Вадим Алексеевич' },
        { TEXT: 'ИНН 231849496378' },
        { TEXT: 'ОГРНИП 325237500082552' },
        { TEXT: 'rusprofile.ru ↗', HREF: externalLinks.rusprofile },
        { TEXT: 'telegram ↗', HREF: 'https://t.me/vakalushko', ICON: asset('icon-telegram-plane.svg') },
      ],
    },
  ],
}
