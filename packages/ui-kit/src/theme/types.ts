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
  | 's6'
  | 's8'
  | 's10'
  | 's12'
  | 's14'
  | 's16'
  | 's20'
  | 's24'
  | 's28'
  | 's32'
  | 's36'
  | 's40'
  | 's48'
  | 's56'
  | 's64'
  | 's72'
  | 's80'
  | 's96'

export type Spacings = {
  [key in SpacingsTypes]: number
}
