import { ListIcon } from '../icons/ListIcon'
import { GridIcon } from '../icons/GridIcon'
import styles from './ViewToggle.module.css'

export type ViewMode = 'list' | 'grid'

interface Props {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

const OPTIONS: { value: ViewMode; Icon: React.ComponentType<{ size?: number }> }[] = [
  { value: 'list', Icon: ListIcon },
  { value: 'grid', Icon: GridIcon },
]

export function ViewToggle({ value, onChange }: Props) {
  const activeIndex = OPTIONS.findIndex(o => o.value === value)

  return (
    <div className={styles.toggle}>
      <div className={styles.iconRow}>
        {OPTIONS.map(({ value: opt, Icon }) => (
          <button
            key={opt}
            className={`${styles.iconButton} ${opt === value ? styles.active : ''}`}
            onClick={() => onChange(opt)}
            aria-pressed={opt === value}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
      <div className={styles.rail}>
        <div
          className={styles.indicator}
          style={{ transform: `translateX(${activeIndex * 36}px)` }}
        />
      </div>
    </div>
  )
}
