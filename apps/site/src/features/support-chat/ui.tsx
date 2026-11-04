import { useState } from 'react'
import { useTheme } from 'styled-components'

import { Button, Image } from '@my-interview/ui-kit'

import { asset, supportChatId } from '@shared/constants'

import { TEXT } from './config'
import { Styled } from './styled'

const cookieStorageKey = 'guest-cookie-accepted'

export const SupportChat = () => {
  const theme = useTheme()
  const [isCookieVisible, setIsCookieVisible] = useState(() => window.sessionStorage.getItem(cookieStorageKey) !== '1')

  const acceptCookie = () => {
    window.sessionStorage.setItem(cookieStorageKey, '1')
    setIsCookieVisible(false)
  }

  return (
    <Styled.Container alignItems="flex-end" flexDirection="column" gap={theme.spacings.s20}>
      <Styled.ChatButton
        alignItems="center"
        aria-label="Чат поддержки"
        forwardedAs="button"
        id={supportChatId}
        justifyContent="center"
        p={0}
        type="button"
      >
        <Image alt="" height={24} src={asset('icons/icon-chat.svg')} width={24} />
      </Styled.ChatButton>

      {isCookieVisible && (
        <Styled.Banner alignItems="center" flexWrap="wrap" gap={theme.spacings.s16} tablet={{ flexWrap: 'nowrap' }}>
          <span>
            <strong>{TEXT.COOKIE}</strong> {TEXT.BANNER}
          </span>
          <Button variant="white" onClick={acceptCookie}>
            {TEXT.ACCEPT}
          </Button>
        </Styled.Banner>
      )}
    </Styled.Container>
  )
}
