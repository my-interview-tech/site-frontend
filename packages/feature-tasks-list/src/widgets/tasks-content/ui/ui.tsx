import { useCallback, useMemo, useState } from 'react'

import { Aside, Columns, useTaskProgress } from '@my-interview/common'
import { BottomSheet, Button, Flex, IconButton, Input, Select, Tabs, Text, theme } from '@my-interview/ui-kit'

import { EMPTY_SELECTION, TasksFilter, filterTasks, sortTasks } from '@tasks-list/features/tasks-filter'
import type { TaskSelection } from '@tasks-list/features/tasks-filter'
import { TaskCardItem } from '@tasks-list/entities/task-card'
import type { TaskCard } from '@tasks-list/shared/model'

import { SORT_OPTIONS, SORT_ORDER, TEXT } from '../constants'
import { useFavorites } from '../hooks'
import type { CatalogTab, TasksContentProps } from '../types'
import { Styled } from './styled'

/**
 * Каталог задач.
 *
 * @description
 * - От планшета фильтры в липкой колонке справа.
 * - Ниже планшета фильтры открываются шторкой из шапки.
 * - «Избранное» берёт id из отдельной ручки и отбирает уже загруженный каталог.
 * - Пустой результат — подсказка, не ошибка.
 */
export const TasksContent = ({ filters, items, onSelectionChange, selection: controlled }: TasksContentProps) => {
  const [inner, setInner] = useState<TaskSelection>(EMPTY_SELECTION)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [tab, setTab] = useState<CatalogTab>('list')
  const { favoriteIds, toggleFavorite } = useFavorites()
  const selection = controlled ?? inner
  const progress = useTaskProgress()

  const setSelection = useCallback(
    (next: TaskSelection) => {
      setInner(next)
      onSelectionChange?.(next)
    },
    [onSelectionChange]
  )

  const merged = useMemo(
    () =>
      items.map((item) => {
        const solved = progress[item.tech]
        const solvedIds: readonly string[] = Array.isArray(solved) ? solved : []
        const isStudied = item.isStudied || solvedIds.includes(item.id)
        const isAbandoned = isStudied ? false : item.isAbandoned

        if (isStudied === item.isStudied && isAbandoned === item.isAbandoned) {
          return item
        }

        return { ...item, isAbandoned, isStudied }
      }),
    [items, progress]
  )
  const matched: TaskCard[] = useMemo(
    () => sortTasks(filterTasks(merged, selection), selection.sort, selection.order),
    [merged, selection]
  )
  const favoriteMatched = useMemo(() => matched.filter((item) => favoriteIds.has(item.id)), [favoriteIds, matched])
  const visible = tab === 'favorites' ? favoriteMatched : matched
  const isAscending = selection.order === 'asc'

  const handleClose = useCallback(() => {
    setIsFiltersOpen(false)
  }, [])

  const setSort = (ids: string[]) => {
    const option = SORT_OPTIONS.find(({ id }) => id === ids[0])

    if (!option) {
      return
    }

    setSelection({ ...selection, order: SORT_ORDER[option.id], sort: option.id })
  }

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <BottomSheet isOpen={isFiltersOpen} title={TEXT.FILTERS} onClose={handleClose}>
        <TasksFilter inDrawer filters={filters} selection={selection} onChange={setSelection} />
      </BottomSheet>

      <Columns gap={theme.spacings.s40} sidebar={280}>
        <Styled.Column flexDirection="column" gap={theme.spacings.s16}>
          <Flex justifyContent="center">
            <Tabs
              items={[
                { id: 'list', label: `${TEXT.LIST} ${matched.length}` },
                { id: 'favorites', label: `${TEXT.FAVORITES} ${favoriteMatched.length}` },
              ]}
              label={TEXT.CATALOG}
              value={tab}
              onChange={setTab}
            />
          </Flex>

          <Flex alignItems="flex-end" flexWrap="wrap" gap={theme.spacings.s12}>
            <Styled.Column flex={1}>
              <Input
                label={TEXT.SEARCH}
                placeholder={TEXT.SEARCH}
                type="search"
                value={selection.query}
                onChange={(query) => setSelection({ ...selection, query })}
              />
            </Styled.Column>
            <Flex alignItems="flex-end" flex="0 0 auto" gap={theme.spacings.s8}>
              <Flex flexDirection="column" width={220}>
                <Select
                  label={TEXT.SORT}
                  options={SORT_OPTIONS}
                  placeholder={SORT_OPTIONS[0]?.label ?? ''}
                  value={[selection.sort]}
                  onChange={setSort}
                />
              </Flex>
              <IconButton
                disabled={selection.sort === 'default'}
                iconDirection={isAscending ? 'up' : 'down'}
                iconSrc="icon-chevron"
                label={isAscending ? TEXT.SORT_ASC : TEXT.SORT_DESC}
                title={isAscending ? TEXT.SORT_ASC : TEXT.SORT_DESC}
                onClick={() => setSelection({ ...selection, order: isAscending ? 'desc' : 'asc' })}
              />
            </Flex>

            <Styled.FilterAction>
              <Button variant="glass" onClick={() => setIsFiltersOpen(true)}>
                {TEXT.FILTERS}
              </Button>
            </Styled.FilterAction>
          </Flex>

          <Styled.List>
            {visible.length > 0 ? (
              visible.map((item) => (
                <TaskCardItem
                  favorite={favoriteIds.has(item.id)}
                  item={item}
                  key={item.id}
                  onFavorite={toggleFavorite}
                />
              ))
            ) : (
              <Styled.Empty
                alignItems="center"
                flexDirection="column"
                gap={theme.spacings.s8}
                p={`${theme.spacings.s40}px ${theme.spacings.s20}px`}
              >
                <Text as="h2" font={500} weight="semibold">
                  {tab === 'favorites' ? TEXT.EMPTY_FAVORITES : TEXT.EMPTY}
                </Text>

                <Text color={theme.colors.textTertiary} font={400}>
                  {tab === 'favorites' ? TEXT.EMPTY_FAVORITES_HINT : TEXT.EMPTY_HINT}
                </Text>

                {tab === 'list' && (
                  <Button variant="text" onClick={() => setSelection(EMPTY_SELECTION)}>
                    {TEXT.RESET}
                  </Button>
                )}
              </Styled.Empty>
            )}
          </Styled.List>
        </Styled.Column>

        <Styled.Side>
          <Aside>
            <TasksFilter filters={filters} selection={selection} onChange={setSelection} />
          </Aside>
        </Styled.Side>
      </Columns>
    </Flex>
  )
}
