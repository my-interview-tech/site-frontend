import type { FormEvent } from 'react'
import { useTheme } from 'styled-components'
import { useState } from 'react'
import { Navigate, useSearchParams } from 'react-router'
import { Flex, GridItem, Text } from '@my-interview/ui-kit'

import { MAIN_APP_URL, useSession } from '@my-interview/auth'
import { RouteError } from '@my-interview/common'
import { featureToggles } from '@shared/config'
import { asset, externalLinks } from '@shared/constants'

import { TEXT } from '../config'
import type { AuthScreen } from '../types'
import { Styled } from './styled'

type AuthPageProps = {
  readonly screen: AuthScreen
}

const resetEmailKey = 'my-interview-reset-email'

const withIntent = (path: string, checkout: boolean) => (checkout ? `${path}?intent=checkout` : path)

/**
 * Ссылка на документ.
 * Без адреса остаётся текстом.
 *
 * @param children Подпись ссылки.
 * @param href Адрес документа. Пустая строка отключает переход.
 */
const DocLink = ({ children, href }: { readonly children: string; readonly href: string }) => {
  const theme = useTheme()

  if (!href) {
    return (
      <Text as="span" color={theme.colors.accent} font="body">
        {children}
      </Text>
    )
  }

  return (
    <Text as="a" color={theme.colors.accent} font="body" href={href} rel="noreferrer" target="_blank">
      {children}
    </Text>
  )
}

/**
 * Форма входа, регистрации, восстановления и смены пароля.
 *
 * @param screen Какой шаг авторизации показать.
 */
const AuthForm = ({ screen }: AuthPageProps) => {
  const theme = useTheme()

  const { login } = useSession()
  const [params] = useSearchParams()
  const checkout = params.get('intent') === 'checkout'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [mismatch, setMismatch] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [modal, setModal] = useState(false)
  const text = TEXT[screen]
  const showEmail = screen === 'login' || screen === 'register' || screen === 'forgot'
  const showPassword = screen === 'login' || screen === 'register' || screen === 'reset'
  const showConfirm = screen === 'register' || screen === 'reset'
  const showSocial = screen === 'login' || screen === 'register'

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMismatch(false)
    setInvalidPassword(false)

    if (email.trim().toLowerCase() === 'down@example.com') {
      setModal(true)

      return
    }

    if (screen === 'login' && password === 'wrong') {
      setInvalidPassword(true)

      return
    }

    if ((screen === 'register' || screen === 'reset') && password !== confirm) {
      setMismatch(true)

      return
    }

    if (screen === 'forgot') {
      window.sessionStorage.setItem(resetEmailKey, email.trim())
      window.location.assign('/forgot-password/sent')

      return
    }

    if (screen === 'reset') {
      const stored = window.sessionStorage.getItem(resetEmailKey)

      openAccount(stored || 'user')

      return
    }

    openAccount(email.trim())
  }

  const closeModal = () => {
    setModal(false)
  }

  const openAccount = (nextEmail: string) => {
    login(nextEmail)
    window.location.assign(`${MAIN_APP_URL}/login?email=${encodeURIComponent(nextEmail)}`)
  }

  return (
    <Styled.Root data-nav-surface="page">
      <Styled.Body>
        <GridItem size={6}>
          <Styled.Illustration
            fillHeight
            alignItems="center"
            flexDirection="column"
            gap={theme.spacings.s20}
            justifyContent="center"
            p={theme.spacings.s40}
          >
            <Styled.Art alt="" height={380} src={asset('images/auth-illustration.svg')} width={560} />
            <Flex alignItems="center" flexDirection="column" gap={theme.spacings.s6}>
              <Text as="p" color={theme.colors.ink} font="cardTitle" textAlign="center">
                Подготовка к интервью
              </Text>
              <Text as="p" color={theme.colors.muted} font="navLink" textAlign="center">
                Реальные вопросы и практика кода
              </Text>
            </Flex>
          </Styled.Illustration>
        </GridItem>
        <GridItem size={6}>
          <Flex
            alignItems="flex-start"
            desktopS={{ p: `${theme.spacings.s48}px ${theme.spacings.s80}px` }}
            p={`${theme.spacings.s24}px ${theme.layout.pageGutterMobile}px`}
            tablet={{ p: `${theme.spacings.s48}px ${theme.spacings.s32}px` }}
          >
            <Styled.Form
              fillWidth
              desktopS={{ width: 400 }}
              flexDirection="column"
              forwardedAs="form"
              gap={theme.spacings.s12}
              onSubmit={screen === 'sent' ? undefined : onSubmit}
            >
              <Flex flexDirection="column" gap={theme.spacings.s6}>
                <Text as="h1" color={theme.colors.ink} font="sectionTitleMobile">
                  {text.title}
                </Text>
                <Text as="p" color={theme.colors.caption} font="body">
                  {text.subtitle}
                </Text>
              </Flex>
              {checkout && (screen === 'login' || screen === 'register') ? (
                <Styled.Checkout>
                  <Text color={theme.colors.accent} font="label">
                    Вы оформляете: 3 месяца · 1 800 ₽
                  </Text>
                </Styled.Checkout>
              ) : null}
              {showEmail ? (
                <Flex flexDirection="column" gap={theme.spacings.s6}>
                  <Text as="label" color={theme.colors.ink} font="label" htmlFor="auth-email">
                    Email
                  </Text>
                  <Styled.Control
                    required
                    autoComplete="email"
                    id="auth-email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Flex>
              ) : null}
              {showPassword ? (
                <Flex flexDirection="column" gap={theme.spacings.s6}>
                  <Text as="label" color={theme.colors.ink} font="label" htmlFor="auth-password">
                    Пароль
                  </Text>
                  <Styled.Control
                    required
                    $invalid={invalidPassword}
                    aria-describedby={invalidPassword ? 'auth-password-error' : undefined}
                    aria-invalid={invalidPassword}
                    autoComplete={screen === 'login' ? 'current-password' : 'new-password'}
                    id="auth-password"
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {invalidPassword ? (
                    <Text as="span" color={theme.colors.danger} font="planNote" id="auth-password-error">
                      Неверный email или пароль
                    </Text>
                  ) : null}
                </Flex>
              ) : null}
              {showConfirm ? (
                <Flex flexDirection="column" gap={theme.spacings.s6}>
                  <Text as="label" color={theme.colors.ink} font="label" htmlFor="auth-confirm">
                    Подтверждение пароля
                  </Text>
                  <Styled.Control
                    required
                    $invalid={mismatch}
                    aria-describedby={mismatch ? 'auth-confirm-error' : undefined}
                    aria-invalid={mismatch}
                    autoComplete="new-password"
                    id="auth-confirm"
                    name="confirm"
                    placeholder="Повторите пароль"
                    type="password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                  />
                  {mismatch ? (
                    <Text as="span" color={theme.colors.danger} font="planNote" id="auth-confirm-error">
                      Пароли не совпадают
                    </Text>
                  ) : null}
                </Flex>
              ) : null}
              {screen === 'register' ? (
                <Styled.Consent alignItems="flex-start" forwardedAs="label" gap={theme.spacings.s8}>
                  <Styled.Box required name="consent" type="checkbox" />
                  <span>
                    Согласен с <DocLink href={externalLinks.offer}>Правилами</DocLink> и{' '}
                    <DocLink href={externalLinks.privacy}>Политикой конфиденциальности</DocLink>
                  </span>
                </Styled.Consent>
              ) : null}
              {screen === 'login' ? (
                <Flex justifyContent="flex-end">
                  <Text as="a" color={theme.colors.accent} font="body" href="/forgot-password">
                    Забыли пароль?
                  </Text>
                </Flex>
              ) : null}
              {screen === 'sent' ? (
                <Styled.Success>
                  <Text color={theme.colors.success} font="planNote">
                    Ссылка отправлена на ваш email
                  </Text>
                </Styled.Success>
              ) : null}
              {screen === 'sent' ? null : (
                <Styled.Submit fillWidth alignItems="center" forwardedAs="button" justifyContent="center" type="submit">
                  {text.submit}
                </Styled.Submit>
              )}
              {showSocial ? (
                <Styled.Divider alignItems="center" gap={theme.spacings.s12}>
                  <Styled.Line />
                  или
                  <Styled.Line />
                </Styled.Divider>
              ) : null}
              {showSocial ? (
                <Styled.Yandex
                  fillWidth
                  alignItems="center"
                  forwardedAs="button"
                  gap={theme.spacings.s10}
                  justifyContent="center"
                  type="button"
                  onClick={() => openAccount('yandex@example.com')}
                >
                  <Styled.YandexMark />
                  {screen === 'register' ? 'Продолжить с Яндекс' : 'Войти через Яндекс'}
                </Styled.Yandex>
              ) : null}
              {screen === 'login' ? (
                <Styled.Switch forwardedAs="p" gap={theme.spacings.s6}>
                  Нет аккаунта?
                  <Text as="a" color={theme.colors.accent} font="body" href={withIntent('/register', checkout)}>
                    Зарегистрироваться
                  </Text>
                </Styled.Switch>
              ) : null}
              {screen === 'register' ? (
                <Styled.Switch forwardedAs="p" gap={theme.spacings.s6}>
                  Уже есть аккаунт?
                  <Text as="a" color={theme.colors.accent} font="body" href={withIntent('/login', checkout)}>
                    Войти
                  </Text>
                </Styled.Switch>
              ) : null}
              {screen === 'forgot' || screen === 'sent' || screen === 'reset' ? (
                <Text as="a" color={theme.colors.accent} font="body" href="/login">
                  Вернуться ко входу
                </Text>
              ) : null}
            </Styled.Form>
          </Flex>
        </GridItem>
      </Styled.Body>
      {modal ? (
        <RouteError
          overlay
          lead="Сервис временно недоступен. Попробуйте позже."
          title="Не удалось выполнить вход"
          onClose={closeModal}
          onRetry={closeModal}
        />
      ) : null}
    </Styled.Root>
  )
}

/**
 * Экран авторизации.
 * При выключенном флаге `auth` уводит на главную.
 *
 * @param props Экран формы: вход, регистрация или сброс пароля.
 */
const AuthPage = (props: AuthPageProps) => (featureToggles.auth ? <AuthForm {...props} /> : <Navigate replace to="/" />)

export { AuthPage }
