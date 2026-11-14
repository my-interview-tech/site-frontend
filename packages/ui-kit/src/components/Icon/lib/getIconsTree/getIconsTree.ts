import axios from 'axios'

import { ICONS_URL } from '../../Icon.constants'

const isIconsTree = (value: unknown): value is { icons: string[] } =>
  typeof value === 'object' &&
  value !== null &&
  'icons' in value &&
  Array.isArray(value.icons) &&
  value.icons.every((icon: unknown) => typeof icon === 'string')

/**
 * Имена всех иконок из `static/src/icons/structure.json`.
 * Пишет скрипт `icons:structure` пакета static.
 */
export const getIconsTree = async (): Promise<string[]> => {
  const { data } = await axios.get<unknown>(`${ICONS_URL}/structure.json`)

  if (!isIconsTree(data)) {
    throw new Error('icons/structure.json: ожидался { icons: string[] }')
  }

  return data.icons
}
