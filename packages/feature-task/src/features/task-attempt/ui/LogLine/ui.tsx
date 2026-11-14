import type { LogLineProps } from '../../types'
import { Styled } from '../styled'

/**
 * Строка вывода `console`, цвет по уровню вызова.
 */
export const LogLine = ({ entry }: LogLineProps) => <Styled.Log $level={entry.level}>{entry.text}</Styled.Log>
