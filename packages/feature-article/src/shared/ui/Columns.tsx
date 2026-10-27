import styled from 'styled-components'

import { belowTablet } from '@my-interview/ui-kit'

/** Сетка статьи: контент и колонка 240px. До 768px одна колонка. */
export const Columns = styled.div`
  align-items: start;
  display: grid;
  gap: ${({ theme }) => theme.spacings.s20}px;
  grid-template-columns: minmax(0, 1fr) 240px;

  ${({ theme }) => belowTablet(theme)} {
    grid-template-columns: minmax(0, 1fr);
  }
`
