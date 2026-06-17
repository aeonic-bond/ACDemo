const ROTATION = {
  down: 0,
  up: 180,
  right: -90,
  left: 90,
}

interface Props {
  direction?: 'up' | 'down' | 'left' | 'right'
  size?: number
  className?: string
}

export function ChevronIcon({ direction = 'down', size = 16, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${ROTATION[direction]}deg)`, display: 'block' }}
      className={className}
      aria-hidden="true"
    >
      <path d="M 4 6 L 8 10 L 12 6" />
    </svg>
  )
}
