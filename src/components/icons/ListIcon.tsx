interface Props {
  size?: number
}

export function ListIcon({ size = 20 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4.166H2.50833M2.5 10H2.50833M2.5 15.834H2.50833M6.66667 4.166H17.5M6.66667 10H17.5M6.66667 15.834H17.5" />
    </svg>
  )
}
