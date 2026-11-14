import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { QuizForm } from '@quiz/widgets/quiz-form'

import { useResponse } from '../hooks'
import type { QuizViewProps } from '../types'
import { Skeleton } from './Skeleton'
import { Styled } from './styled'

/**
 * Экран квиза.
 */
export const QuizView = ({ id, nav, onBack, onSolved, tech }: QuizViewProps) => {
  const { pageStatus, data, reload } = useResponse({ id, tech })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS: {
        const { answers, ...screen } = data

        return (
          <Styled.Frame flexDirection="column" gap={theme.spacings.s12}>
            {nav?.(screen)}
            <QuizForm
              key={`${tech}:${id}`}
              answers={answers}
              id={id}
              intro={screen.intro}
              pages={screen.pages}
              questionSeconds={screen.questionSeconds}
              retryAt={screen.retryAt}
              serverDate={screen.serverDate}
              tech={tech}
              title={screen.title}
              onSolved={onSolved}
            />
          </Styled.Frame>
        )
      }
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
