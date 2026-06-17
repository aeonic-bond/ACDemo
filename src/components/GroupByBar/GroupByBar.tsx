import { FilterChip } from '../FilterChip'
import styles from './GroupByBar.module.css'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function GroupByBar({ options, value, onChange }: Props) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Group By:</span>
      <div className={styles.chips}>
        {options.map(opt => (
          <FilterChip
            key={opt.value}
            label={opt.label}
            active={opt.value === value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  )
}
