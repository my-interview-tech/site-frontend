interface ChevronProps {
  /** Куда смотрит шеврон. */
  direction: 'down' | 'left' | 'right' | 'up'
}

const rotation: Record<ChevronProps['direction'], string> = {
  down: '90deg',
  left: '180deg',
  right: '0deg',
  up: '-90deg',
}

const ChevronIcon = ({ direction }: ChevronProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="16"
    style={{ transform: `rotate(${rotation[direction]})` }}
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      d="M6 3.5 10.5 8 6 12.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
    />
  </svg>
)

const NavIcon = () => (
  <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
    <path d="M3 4.5h10M3 8h10M3 11.5h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
  </svg>
)

const LockIcon = () => (
  <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
    <rect height="6" rx="1.5" stroke="currentcolor" strokeWidth="1.2" width="9" x="2.5" y="6" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentcolor" strokeWidth="1.2" />
  </svg>
)

export { ChevronIcon, LockIcon, NavIcon }
