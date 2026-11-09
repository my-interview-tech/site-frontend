import { Text, theme } from '@my-interview/ui-kit'

import { anchorOf } from '../../lib/anchor'
import { covers, noteLit, stepLit, type FlowContext } from '../../lib/flow'
import type { Step, Topic } from '../../lib/graph'
import { TopicCard } from '../TopicCard'

import { Styled } from './styled'

export type StepListProps = FlowContext & {
  steps: readonly Step[]
}

/**
 * Шаги трека столбиком для узких экранов, без графа.
 *
 * @description
 * - Тема и группа — карточки с якорем.
 * - Развилка — заголовок с якорем и ветки под ним на пунктирной линии.
 * - Заметка — плашка. Фильтр гасит то же, что и в графе.
 */
export const StepList = ({ known, lens, steps, topicHref }: StepListProps) => {
  const renderCard = (topic: Topic) => (
    <TopicCard
      isFluid
      href={topic.disabled ? undefined : topicHref(topic.slug)}
      isDimmed={!covers(topic, lens)}
      isKnown={known.has(topic.slug)}
      topic={topic}
    />
  )

  const renderBranch = (topics: readonly Topic[]) =>
    topics.length > 0 && (
      <Styled.Branch
        flexDirection="column"
        forwardedAs="ul"
        gap={theme.spacings.s8}
        p={`0 0 0 ${theme.spacings.s16}px`}
      >
        {topics.map((topic) => (
          <li key={topic.slug}>{renderCard(topic)}</li>
        ))}
      </Styled.Branch>
    )

  return (
    <Styled.Root fillWidth flexDirection="column" forwardedAs="ol" gap={theme.spacings.s16} p={0}>
      {steps.map((step, index) => {
        if (step.kind === 'note') {
          return (
            <li key={`note-${index}`}>
              <Styled.Note
                $isDimmed={!noteLit(steps, index, lens)}
                flexDirection="column"
                gap={theme.spacings.s6}
                p={`${theme.spacings.s12}px ${theme.spacings.s16}px`}
              >
                <Text as="p" color={theme.colors.textSecondary} font={400}>
                  {step.text}
                </Text>
                {Boolean(step.promo) && (
                  <Text as="p" color={theme.colors.accent} font={200}>
                    {step.promo}
                  </Text>
                )}
              </Styled.Note>
            </li>
          )
        }

        if (step.kind === 'group') {
          return (
            <Styled.Step key={`group-${index}`} flexDirection="column" forwardedAs="li" gap={theme.spacings.s8}>
              {step.topics.map((topic) => (
                <Styled.Step key={topic.slug} flexDirection="column" id={anchorOf(topic.slug)}>
                  {renderCard(topic)}
                </Styled.Step>
              ))}
            </Styled.Step>
          )
        }

        const branch = [...(step.left?.items ?? []), ...(step.right?.items ?? [])]

        if (step.kind === 'fork') {
          return (
            <Styled.Step
              key={step.slug}
              flexDirection="column"
              forwardedAs="li"
              gap={theme.spacings.s8}
              id={anchorOf(step.slug)}
            >
              <Styled.Heading $isDimmed={!stepLit(step, lens)}>
                <Text as="h2" color={theme.colors.ink} font={500} weight="semibold">
                  {step.title}
                </Text>
              </Styled.Heading>
              {renderBranch(branch)}
            </Styled.Step>
          )
        }

        return (
          <Styled.Step
            key={step.topic.slug}
            flexDirection="column"
            forwardedAs="li"
            gap={theme.spacings.s8}
            id={anchorOf(step.topic.slug)}
          >
            {renderCard(step.topic)}
            {renderBranch(branch)}
          </Styled.Step>
        )
      })}
    </Styled.Root>
  )
}
