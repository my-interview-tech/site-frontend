export type Radii = { [Key in keyof typeof radii]: number }

export const radii = {
  r2: 2,
  r8: 8,
  r10: 10,
  r12: 12,
  r14: 14,
  r16: 16,
  r18: 18,
  r20: 20,
  r24: 24,
  r32: 32,
  rPill: 999,
} as const
