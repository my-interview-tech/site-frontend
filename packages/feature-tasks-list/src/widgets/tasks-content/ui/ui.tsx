import { useCallback, useMemo, useState } from 'react'

import { Aside, useTaskProgress } from '@my-interview/common'
import {
  BottomSheet,
  Button,
  Flex,
  IconButton,
  Input,
  Select,
  Tabs,
  Text,
  theme,
  useBreakpoint,
} from '@my-interview/ui-kit'

import { EMPTY_SELECTION, TasksFilter, filterTasks, sortTasks } from '@tasks-list/features/tasks-filter'
import type { TaskSelection } from '@tasks-list/features/tasks-filter'
import { TaskCardItem } from '@tasks-list/entities/task-card'
import type { TaskCard } from '@tasks-list/shared/model'

import { SORT_OPTIONS, SORT_ORDER, TEXT, featureToggles } from '../constants'
import { useFavorites } from '../hooks'
import type { CatalogTab, TasksContentProps } from '../types'
import { Styled } from './styled'

/**
 * Каталог задач.
 *
 * @description
 * - С `desktopXS` фильтры в липкой колонке справа. Карточки в две колонки с `desktopS`, до него — одна.
 * - До `desktopXS` фильтры открываются шторкой: на телефоне кнопкой, на планшете — кнопкой с иконкой.
 * - Ниже планшета сортировка — кнопка с иконкой, список в шторке.
 * - «Избранное» берёт id из отдельной ручки и отбирает уже загруженный каталог.
 * - Пустой результат — подсказка, не ошибка.
 */
export const TasksContent = ({ filters, items, onSelectionChange, selection: controlled }: TasksContentProps) => {
  const [inner, setInner] = useState<TaskSelection>(EMPTY_SELECTION)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const { isMobile } = useBreakpoint()
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

  const closeSort = useCallback(() => {
    setIsSortOpen(false)
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
      <BottomSheet isOpen={isSortOpen} title={TEXT.SORT} onClose={closeSort}>
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={selection.sort === option.id ? 'primary' : 'secondary'}
              onClick={() => {
                setSort([option.id])
                closeSort()
              }}
            >
              {option.label}
            </Button>
          ))}
        </Flex>
      </BottomSheet>

      <BottomSheet isOpen={isFiltersOpen} title={TEXT.FILTERS} onClose={handleClose}>
        <TasksFilter inDrawer filters={filters} selection={selection} onChange={setSelection} />
      </BottomSheet>

      <Styled.Layout>
        <Flex flexDirection="column" gap={theme.spacings.s16}>
          {featureToggles.catalogTabs && (
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
          )}

          <Flex alignItems="flex-end" flexWrap="wrap" gap={theme.spacings.s12}>
            <Flex fillWidth flex="1 1 100%" tablet={{ flex: '1 1 0' }}>
              <Input
                label={TEXT.SEARCH}
                placeholder={TEXT.SEARCH}
                type="search"
                value={selection.query}
                onChange={(query) => setSelection({ ...selection, query })}
              />
            </Flex>
            <Flex alignItems="flex-end" flex="0 0 auto" gap={theme.spacings.s8}>
              {isMobile ? (
                <IconButton
                  iconSrc="icon-nav"
                  isOpen={isSortOpen}
                  label={TEXT.SORT}
                  onClick={() => setIsSortOpen(true)}
                />
              ) : (
                <Flex flexDirection="column" width={220}>
                  <Select
                    label={TEXT.SORT}
                    options={SORT_OPTIONS}
                    placeholder={SORT_OPTIONS[0]?.label ?? ''}
                    value={[selection.sort]}
                    onChange={setSort}
                  />
                </Flex>
              )}
              <IconButton
                disabled={selection.sort === 'default'}
                iconDirection={isAscending ? 'up' : 'down'}
                iconSrc="icon-chevron"
                label={isAscending ? TEXT.SORT_ASC : TEXT.SORT_DESC}
                title={isAscending ? TEXT.SORT_ASC : TEXT.SORT_DESC}
                onClick={() => setSelection({ ...selection, order: isAscending ? 'desc' : 'asc' })}
              />
            </Flex>

            <Styled.FilterLabel>
              <Button variant="glass" onClick={() => setIsFiltersOpen(true)}>
                {TEXT.FILTERS}
              </Button>
            </Styled.FilterLabel>
            <Styled.FilterIcon>
              <IconButton iconSrc="icon-filter" label={TEXT.FILTERS} onClick={() => setIsFiltersOpen(true)} />
            </Styled.FilterIcon>
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
        </Flex>

        <Styled.Side>
          <Aside>
            <TasksFilter filters={filters} selection={selection} onChange={setSelection} />
          </Aside>
        </Styled.Side>
      </Styled.Layout>
    </Flex>
  )
}
