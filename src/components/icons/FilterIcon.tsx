interface Props {
  size?: number
}

export function FilterIcon({ size = 16 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="2" y="3.5" width="12" height="1.5" rx="0.75" />
      <circle cx="10.5" cy="4.25" r="2" />
      <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" />
      <circle cx="5.5" cy="11.25" r="2" />
    </svg>
  )
}
