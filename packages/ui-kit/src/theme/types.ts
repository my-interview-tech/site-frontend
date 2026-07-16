// Breakpoints types
export type BreakpointsTypes = 'mobile' | 'tablet' | 'desktopXS' | 'desktopS' | 'desktopM' | 'desktopL' | 'desktopXL'

export type Breakpoints = {
  [key in BreakpointsTypes]: number
}

// Spacings types
export type SpacingsTypes =
  | 's0'
  | 's2'
  | 's4'
  | 's8'
  | 's12'
  | 's16'
  | 's20'
  | 's24'
  | 's32'
  | 's36'
  | 's40'
  | 's48'
  | 's64'
  | 's80'

export type Spacings = {
  [key in SpacingsTypes]: number
}
