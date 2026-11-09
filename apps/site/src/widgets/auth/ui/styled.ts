import styled from 'styled-components'

import { Flex, Grid, textStyle, theme } from '@my-interview/ui-kit'

const Root = styled.div`
  background: ${theme.colors.page};
  padding-top: ${theme.spacings.s64}px;
`

const Body = styled(Grid)`
  background: ${theme.colors.surface};
  gap: 0;
  min-height: 720px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    gap: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    min-height: auto;
  }
`

const Illustration = styled(Flex)`
  background: ${theme.colors.canvas};
`

const Form = styled(Flex)`
  @media (min-width: ${theme.breakpoints.tablet + 1}px) and (max-width: ${theme.breakpoints.desktopS - 1}px) {
    max-width: 400px;
  }
`

const Checkout = styled.div`
  background: ${theme.colors.accentBg};
  border: 1px solid ${theme.colors.accentBorder};
  border-radius: ${theme.radii.r8}px;
  padding: ${theme.spacings.s12}px ${theme.spacings.s14}px;
`

const Control = styled.input<{ $invalid?: boolean }>`
  ${textStyle(500)}
  background: ${theme.colors.surface};
  border: 1px solid ${({ $invalid }) => ($invalid ? theme.colors.dangerBorder : theme.colors.borderStrong)};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.ink};
  height: 48px;
  padding: ${theme.spacings.s12}px ${theme.spacings.s14}px;

  &::placeholder {
    color: ${theme.colors.caption};
  }
`

const Submit = styled(Flex)`
  ${textStyle(400, { weight: 'semibold' })}
  background: ${theme.colors.accent};
  border: 0;
  border-radius: 22px;
  color: ${theme.colors.white};
  cursor: pointer;
  height: 44px;
`

const Divider = styled(Flex)`
  color: ${theme.colors.caption};
  font-size: 13px;
  height: 20px;
`

const Line = styled.span`
  background: ${theme.colors.border};
  flex: 1;
  height: 1px;
`

const Yandex = styled(Flex)`
  ${textStyle(400, { weight: 'semibold' })}
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.borderStrong};
  border-radius: 24px;
  color: ${theme.colors.ink};
  cursor: pointer;
  height: 44px;
`

const YandexMark = styled.span`
  background: ${theme.colors.warning};
  border-radius: ${theme.radii.rPill}px;
  height: 20px;
  width: 20px;
`

const Switch = styled(Flex)`
  ${textStyle(400)}
  color: ${theme.colors.caption};
`

const Consent = styled(Flex)`
  color: ${theme.colors.ink};
  font-size: 13px;
  line-height: 18px;
`

const Box = styled.input`
  flex-shrink: 0;
  height: 16px;
  margin-top: 1px;
  width: 16px;
`

const Success = styled.div`
  background: ${theme.colors.successBg};
  border-radius: ${theme.radii.r8}px;
  padding: ${theme.spacings.s12}px ${theme.spacings.s14}px;
`

export const Styled = {
  Body,
  Box,
  Checkout,
  Consent,
  Control,
  Divider,
  Form,
  Illustration,
  Line,
  Root,
  Submit,
  Success,
  Switch,
  Yandex,
  YandexMark,
}
