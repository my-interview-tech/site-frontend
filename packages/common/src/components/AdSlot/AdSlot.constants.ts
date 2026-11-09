/**
 * Размеры слота.
 * Свой размер снаружи передаётся объектом `{ width, height }`.
 */
export const AD_SLOT_SIZE = {
  fullscreen: { height: '100%', isClosable: true, width: '100%' },
  sidebar: { height: 400, isClosable: false, width: 240 },
} as const
