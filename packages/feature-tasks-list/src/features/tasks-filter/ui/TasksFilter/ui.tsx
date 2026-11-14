import { Button, Flex, Icon, Image, Indicator, Select, Text, theme } from '@my-interview/ui-kit'

import { LANGUAGE_ICON, LANGUAGE_LABEL } from '@tasks-list/entities/task-card'

import { EMPTY_SELECTION, TEXT } from '../../constants'
import { getDifficultyHint, hasSelection, parseDifficulties } from '../../lib'
import type { TasksFilterProps } from '../../types'
import { Styled } from '../styled'

/**
 * Панель фильтров списка задач.
 *
 * @description
 * - Язык, сложность и компания — один вариант. Пустой выбор показывает все.
 * - В шторке панель без рамки и без своего заголовка.
 */
export const TasksFilter = ({ filters, inDrawer = false, onChange, selection }: TasksFilterProps) => {
  const FilterComponent = (
    <>
      <Flex alignItems="center" justifyContent={inDrawer ? 'flex-end' : 'space-between'}>
        {!inDrawer && (
          <Text as="h2" font={500} weight="semibold">
            {TEXT.TITLE}
          </Text>
        )}
        <Button disabled={!hasSelection(selection)} variant="text" onClick={() => onChange(EMPTY_SELECTION)}>
          {TEXT.RESET}
        </Button>
      </Flex>

      {filters.languages.length > 0 && (
        <Select
          label={TEXT.LANGUAGES}
          options={filters.languages.map((language) => ({
            id: language,
            label: LANGUAGE_LABEL[language] ?? language,
            slotBefore: LANGUAGE_ICON[language] && <Icon iconSrc={LANGUAGE_ICON[language]} size={16} />,
          }))}
          placeholder={TEXT.ALL}
          value={selection.languages}
          onChange={(languages) => onChange({ ...selection, languages })}
        />
      )}

      {filters.difficulties.length > 0 && (
        <Select
          label={TEXT.DIFFICULTY}
          options={[...filters.difficulties]
            .sort((left, right) => left - right)
            .map((difficulty) => ({
              hint: getDifficultyHint(difficulty, filters.difficulties),
              id: String(difficulty),
              label: `${TEXT.LEVEL} ${difficulty}`,
              slotBefore: <Indicator value={difficulty} />,
            }))}
          placeholder={TEXT.ALL}
          value={selection.difficulties.map(String)}
          onChange={(ids) => onChange({ ...selection, difficulties: parseDifficulties(ids) })}
        />
      )}

      {filters.tags.length > 0 && (
        <Select
          isMultiple
          label={TEXT.TAGS}
          options={filters.tags.map((tag) => ({ id: tag, label: tag }))}
          placeholder={TEXT.ALL}
          value={selection.tags}
          onChange={(tags) => onChange({ ...selection, tags })}
        />
      )}

      {filters.companies.length > 0 && (
        <Select
          label={TEXT.COMPANIES}
          options={filters.companies.map((item) => ({
            id: item.id,
            label: item.name,
            slotBefore: <Image alt="" height={16} src={item.icon} width={16} />,
          }))}
          placeholder={TEXT.ALL}
          value={selection.companies}
          onChange={(companies) => onChange({ ...selection, companies })}
        />
      )}
    </>
  )

  if (inDrawer) {
    return (
      <Flex flexDirection="column" gap={theme.spacings.s20}>
        {FilterComponent}
      </Flex>
    )
  }

  return (
    <Styled.Panel flexDirection="column" gap={theme.spacings.s20} p={theme.spacings.s20}>
      {FilterComponent}
    </Styled.Panel>
  )
}
