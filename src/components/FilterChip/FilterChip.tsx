import styles from './FilterChip.module.css'

interface Props {
  label: string
  active?: boolean
  onClick?: () => void
}

export function FilterChip({ label, active = false, onClick }: Props) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
