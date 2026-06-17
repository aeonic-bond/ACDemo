import { Avatar } from '../Avatar'
import styles from './AssigneeChip.module.css'

interface Props {
  name: string
  count: number
  active?: boolean
  onClick?: () => void
}

export function AssigneeChip({ name, count, active = false, onClick }: Props) {
  return (
    <button
      className={`${styles.chip} ${active ? styles.active : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <Avatar name={name} variant={active ? 'light' : 'default'} className={styles.avatarSpacing} />
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count}</span>
    </button>
  )
}
