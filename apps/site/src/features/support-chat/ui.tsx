import { useState } from 'react'

import { Button, Icon, theme } from '@my-interview/ui-kit'

import { featureToggles } from '@shared/config'
import { supportChatId } from '@shared/constants'

import { TEXT } from './config'
import { Styled } from './styled'

const cookieStorageKey = 'guest-cookie-accepted'

export const SupportChat = () => {
  const [isCookieVisible, setIsCookieVisible] = useState(() => window.sessionStorage.getItem(cookieStorageKey) !== '1')

  const acceptCookie = () => {
    window.sessionStorage.setItem(cookieStorageKey, '1')
    setIsCookieVisible(false)
  }

  if (!featureToggles.chat && !featureToggles.cookies) {
    return null
  }

  return (
    <Styled.Container alignItems="flex-end" flexDirection="column" gap={theme.spacings.s20}>
      {featureToggles.chat && (
        <Styled.ChatButton
          alignItems="center"
          aria-label="Чат поддержки"
          forwardedAs="button"
          id={supportChatId}
          justifyContent="center"
          p={0}
          type="button"
        >
          <Icon iconSrc="icon-chat" size={24} />
        </Styled.ChatButton>
      )}

      {featureToggles.cookies && isCookieVisible && (
        <Styled.Banner alignItems="center" flexWrap="wrap" gap={theme.spacings.s16} tablet={{ flexWrap: 'nowrap' }}>
          <span>
            <strong>{TEXT.COOKIE}</strong> {TEXT.BANNER}
          </span>

          <Button variant="inverse" onClick={acceptCookie}>
            {TEXT.ACCEPT}
          </Button>
        </Styled.Banner>
      )}
    </Styled.Container>
  )
}
