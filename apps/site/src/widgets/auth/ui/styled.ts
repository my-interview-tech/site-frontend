import styled from 'styled-components'

import { belowTablet, Flex, Grid, tabletOnly, textStyle } from '@my-interview/ui-kit'

const Root = styled.div`
  background: ${({ theme }) => theme.colors.page};
  padding-top: ${({ theme }) => theme.spacings.s64}px;
`

const Body = styled(Grid)`
  background: ${({ theme }) => theme.colors.surface};
  gap: 0;
  margin-right: 0;
  margin-left: 0;
  max-width: none;
  min-height: 720px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    gap: 0;
    margin-right: 0;
    margin-left: 0;
    max-width: none;
  }

  ${({ theme }) => belowTablet(theme)} {
    min-height: auto;
  }
`

const Illustration = styled(Flex)`
  background: ${({ theme }) => theme.colors.canvas};
`

const Art = styled.img`
  display: block;
  height: 380px;
  max-width: 100%;
  object-fit: contain;
  width: 560px;

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
    width: 100%;
  }
`

const Form = styled(Flex)`
  ${({ theme }) => tabletOnly(theme)} {
    max-width: 400px;
  }
`

const Checkout = styled.div`
  background: ${({ theme }) => theme.colors.accentBg};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  padding: ${({ theme }) => theme.spacings.s12}px ${({ theme }) => theme.spacings.s14}px;
`

const Control = styled.input<{ $invalid?: boolean }>`
  ${({ theme }) => textStyle(theme.typography.navLink)}
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ $invalid, theme }) => ($invalid ? theme.colors.dangerBorder : theme.colors.borderStrong)};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ theme }) => theme.colors.ink};
  height: 48px;
  padding: ${({ theme }) => theme.spacings.s12}px ${({ theme }) => theme.spacings.s14}px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.caption};
  }
`

const Submit = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.bodyStrong)}
  background: ${({ theme }) => theme.colors.accent};
  border: 0;
  border-radius: 22px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  height: 44px;
`

const Divider = styled(Flex)`
  color: ${({ theme }) => theme.colors.caption};
  font-size: 13px;
  height: 20px;
`

const Line = styled.span`
  background: ${({ theme }) => theme.colors.border};
  flex: 1;
  height: 1px;
`

const Yandex = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.bodyStrong)}
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 24px;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  height: 44px;
`

const YandexMark = styled.span`
  background: ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  height: 20px;
  width: 20px;
`

const Switch = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.body)}
  color: ${({ theme }) => theme.colors.caption};
`

const Consent = styled(Flex)`
  color: ${({ theme }) => theme.colors.ink};
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
  background: ${({ theme }) => theme.colors.successBg};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  padding: ${({ theme }) => theme.spacings.s12}px ${({ theme }) => theme.spacings.s14}px;
`

export const Styled = {
  Art,
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
