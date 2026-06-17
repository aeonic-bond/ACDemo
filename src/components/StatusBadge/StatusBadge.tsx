import styles from './StatusBadge.module.css'

interface Props {
  label: string
  needsAttention: boolean
}

export function StatusBadge({ label, needsAttention }: Props) {
  return (
    <span className={`${styles.badge} ${needsAttention ? styles.attention : ''}`}>
      {label}
    </span>
  )
}
