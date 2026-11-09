/**
 * Ограничивает процент диапазоном 0–100.
 */
export const clampProgress = (value: number): number => Math.min(100, Math.max(0, value))
