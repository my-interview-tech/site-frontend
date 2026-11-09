import { Icon } from '@my-interview/ui-kit'

import { Styled } from './CaseMark.styled'
import type { CaseMarkProps } from './CaseMark.types'

const LABEL = {
  failed: 'Не пройден',
  idle: 'Не запускался',
  passed: 'Пройден',
} as const

/** Круг 20×20: пустой до прогона, галочка или крест после. */
export const CaseMark = ({ state }: CaseMarkProps) => (
  <Styled.Mark $state={state} aria-label={LABEL[state]} role="img">
    {state === 'passed' && <Icon isMonochrome iconSrc="icon-check" size={14} />}
    {state === 'failed' && <Icon isMonochrome iconSrc="icon-cross" size={14} />}
  </Styled.Mark>
)
