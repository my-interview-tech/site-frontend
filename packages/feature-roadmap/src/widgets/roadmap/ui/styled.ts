import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

import { TOC_WIDTH } from '../constants'

const STICKY_TOP = theme.spacings.s96

const Stage = styled.div`
  position: relative;
`

const TocSlot = styled.div`
  bottom: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: ${TOC_WIDTH}px;
  z-index: 2;
`

const TocScroll = styled.div`
  max-height: calc(100vh - ${STICKY_TOP + theme.spacings.s32}px);
  overflow-y: auto;
  pointer-events: auto;
  position: sticky;
  top: ${STICKY_TOP}px;
`

export const Styled = {
  Stage,
  TocScroll,
  TocSlot,
}
