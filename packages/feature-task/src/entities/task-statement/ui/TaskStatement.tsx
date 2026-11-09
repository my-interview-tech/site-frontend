import { useState } from 'react'

import { ListBlock, pluralize } from '@my-interview/common'
import {
  Button,
  Chip,
  Divider,
  Flex,
  Icon,
  IconButton,
  Link,
  Spinner,
  Tabs,
  Text,
  Title,
  theme,
} from '@my-interview/ui-kit'
import type { TabsItem } from '@my-interview/ui-kit'

import { CaseMark, CodeEditor } from '@task/shared/ui'

import { COMPANIES, HIDDEN_TEST_FORMS, SUITE_LABEL, TEXT } from '../constants'
import { getSharedHead, getSuiteState, groupTestsByCode, parseTestDiff, splitTestPath } from '../lib'
import type { StatementPane, TaskStatementProps } from '../types'
import { ScaleMarks } from './ScaleMarks'
import { Styled } from './styled'

const EMPTY_DIFF = { expected: '', received: '' }

/**
 * Условие задачи.
 *
 * @description
 * - В условии вкладки: описание, ожидания собеседования, навыки.
 * - Открытые тесты: значок и путь `describe / it`, код ниже. Expected и Received — колонки таблицы.
 * - Скрытые тесты не показываются, только их число.
 */
export const TaskStatement = ({
  hiddenCount,
  interview,
  language,
  failed = false,
  lead,
  outcome,
  results,
  running = false,
  skill,
  solved = false,
  statement,
  tasksHref,
  tests,
  title,
}: TaskStatementProps) => {
  const [pane, setPane] = useState<StatementPane>('description')

  const panes: TabsItem<StatementPane>[] = [
    { id: 'description', label: TEXT.DESCRIPTION },
    ...(interview ? [{ id: 'review' as const, label: interview.title }] : []),
    { id: 'skills', label: TEXT.SKILLS },
  ]

  return (
    <Styled.Column flexDirection="column" gap={theme.spacings.s16}>
      <Flex inline alignItems="center" gap={theme.spacings.s16}>
        <IconButton
          as={Link}
          href={tasksHref}
          iconSrc="icon-grid"
          label={TEXT.ALL_TASKS}
          size={48}
          title={TEXT.ALL_TASKS}
        />
        {COMPANIES.map((company) => (
          <Button key={company.name} aria-label={company.name} size={48} title={company.name}>
            <Icon iconSrc={company.iconSrc} size={32} />
          </Button>
        ))}
      </Flex>
      <Divider />
      <Styled.Panel
        $share={1}
        forwardedAs="section"
        flexDirection="column"
        gap={theme.spacings.s12}
        p={theme.spacings.s24}
      >
        <Tabs items={panes} label={TEXT.PANES} value={pane} onChange={setPane} />
        {pane === 'description' && (
          <>
            <Title size={700} subtitle={lead} title={title} titleAs="h1" />

            {statement.map((paragraph) => (
              <Text key={paragraph} as="p" color={theme.colors.textSecondary} font={500}>
                {paragraph}
              </Text>
            ))}
          </>
        )}
        {pane === 'review' && interview && (
          <>
            <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
              {interview.label}
            </Text>

            {interview.body && (
              <Text as="p" color={theme.colors.textSecondary} font={400}>
                {interview.body}
              </Text>
            )}

            {outcome && (
              <>
                <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
                  {outcome.label}
                </Text>

                <ListBlock>
                  {outcome.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ListBlock>
              </>
            )}
          </>
        )}

        {pane === 'skills' && skill && (
          <Flex flexDirection="column" gap={theme.spacings.s16}>
            <Text as="h2" color={theme.colors.textPrimary} font={700} weight="semibold">
              {skill.skill.join(', ')}
            </Text>

            {Boolean(skill.keywords?.length) && (
              <Flex flexWrap="wrap" gap={theme.spacings.s8}>
                {skill.keywords?.map((keyword) => (
                  <Chip key={keyword} variant="rect">
                    {keyword}
                  </Chip>
                ))}
              </Flex>
            )}

            {(skill.importance || skill.complexity) && (
              <Flex flexWrap="wrap" gap={theme.spacings.s24}>
                {skill.importance && <ScaleMarks label={TEXT.IMPORTANCE} value={skill.importance} />}
                {skill.complexity && <ScaleMarks label={TEXT.COMPLEXITY} value={skill.complexity} />}
              </Flex>
            )}

            {skill.subscribe && (
              <Text
                as={Link}
                color={theme.colors.accent}
                font={400}
                href={skill.subscribe.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {skill.subscribe.label}
              </Text>
            )}
          </Flex>
        )}
      </Styled.Panel>

      {tests.length > 0 && (
        <Styled.Panel
          $failed={failed}
          $share={2}
          $solved={solved}
          forwardedAs="section"
          flexDirection="column"
          gap={theme.spacings.s16}
          p={theme.spacings.s24}
        >
          <Text as="h2" color={theme.colors.textPrimary} font={500} weight="semibold">
            {TEXT.TESTING}
          </Text>
          <Styled.Tests>
            {groupTestsByCode(tests).map((group) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              const head = getSharedHead(group.items)
              const withKind = group.items.some((test) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const parts = splitTestPath(test.title)
                const body = head ? parts.slice(1) : parts

                return body.length > 1
              })

              return (
                <Styled.Case flexDirection="column" key={group.items[0]?.id}>
                  <Styled.Sheet>
                    <thead>
                      <tr>
                        <Styled.Caption colSpan={withKind ? 3 : 2}>{head}</Styled.Caption>
                        <Styled.Caption>{TEXT.EXPECTED}</Styled.Caption>
                        <Styled.Caption>{TEXT.RECEIVED}</Styled.Caption>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((test) => {
                        const result = results?.[test.id]
                        const state = getSuiteState(running, result?.passed)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        const parts = splitTestPath(test.title)
                        const body = head ? parts.slice(1) : parts
                        const kind = body.length > 1 ? body[0] : undefined
                        const name = (kind ? body.slice(1) : body).join(' / ')
                        const diff = state === 'failed' ? parseTestDiff(result?.message) : EMPTY_DIFF

                        return (
                          <tr key={test.id}>
                            <Styled.Mark $state={state} aria-label={`${SUITE_LABEL[state]}. ${parts.join(' / ')}`}>
                              {state === 'running' ? <Spinner size={12} /> : <CaseMark state={state} />}
                            </Styled.Mark>
                            {withKind && <Styled.Kind>{kind}</Styled.Kind>}
                            <Styled.Cell $state={state} colSpan={withKind ? 1 : 2}>
                              {name}
                            </Styled.Cell>
                            <Styled.Cell $state={state === 'failed' ? 'failed' : 'idle'}>{diff.expected}</Styled.Cell>
                            <Styled.Cell $state={state === 'failed' ? 'failed' : 'idle'}>{diff.received}</Styled.Cell>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Styled.Sheet>
                  <CodeEditor
                    readOnly
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    label={splitTestPath(group.items[0]?.title ?? '').join(' / ')}
                    language={language}
                    value={group.code}
                  />
                </Styled.Case>
              )
            })}
          </Styled.Tests>
          {hiddenCount > 0 && (
            <Text as="p" color={theme.colors.textTertiary} font={200}>
              {`${pluralize(hiddenCount, HIDDEN_TEST_FORMS)} — ${TEXT.HIDDEN_HINT}`}
            </Text>
          )}
        </Styled.Panel>
      )}
    </Styled.Column>
  )
}
