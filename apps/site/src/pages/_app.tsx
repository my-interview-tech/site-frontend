import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'

import { Flex, LinkProvider, UiKitProvider } from '@my-interview/ui-kit'
import { RouteError } from '@my-interview/common'

import { Footer } from '@features/footer'
import { SupportChat } from '@features/support-chat'
import { Header } from '@features/header'
import { RouterLink } from '@shared/ui/router-link'
import { GuestChromeProvider } from '@shared/model/guest-chrome'

type Props = {
  children: ReactNode
}

const Wrapper = styled(Flex)`
  min-height: 100vh;
`

const PageContainer = ({ children }: Props) => (
  <UiKitProvider>
    <LinkProvider component={RouterLink}>
      <GuestChromeProvider>
        <Wrapper relatively flexDirection="column">
          <Header />
          <Flex fillWidth as="main" flex={1} flexDirection="column">
            {children}
          </Flex>
          <Footer />
          <SupportChat />
        </Wrapper>
      </GuestChromeProvider>
    </LinkProvider>
  </UiKitProvider>
)

/**
 * Корневой компонент сайта.
 * @description Корневой компонент сайта. Содержит тему, шапку, контент маршрута и футер.
 */
const App = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
)

/**
 * Экран ошибки маршрута.
 * @description Экран ошибки маршрута в том же каркасе, что и остальные страницы.
 */
const Catch = () => (
  <PageContainer>
    <RouteError />
  </PageContainer>
)

export { Catch }
export default App
