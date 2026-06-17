import type { RawCase } from '../../types/request'
import styles from './HeaderBar.module.css'

interface Props {
  case: RawCase
}

function daysAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  return `opened ${days} d ago`
}

export function HeaderBar({ case: c }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.nameSection}>
        <p className={styles.caseName}>{c.matter_name}</p>
      </div>
      <div className={styles.metaSection}>
        <div className={styles.metaStack}>
          <span className={styles.caseType}>{c.id} • {c.client_name} • {c.matter_type}</span>
          <span className={styles.caseAge}>{daysAgo(c.opened_at)}</span>
        </div>
      </div>
    </div>
  )
}
