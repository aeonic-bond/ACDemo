import type { ProcessedRequest, RawRequest } from '../../types/request'
import { RequestCard } from '../RequestCard'
import styles from './RequestColumn.module.css'

interface Props {
  label: string
  requests: ProcessedRequest[]
  layout?: 'card' | 'row'
  onUpdate?: (id: string, patch: Partial<RawRequest>) => void
  // --- FLIP ANIMATION ---
  setCardRef?: (id: string) => (el: HTMLElement | null) => void
  // --- END FLIP ANIMATION ---
}

export function RequestColumn({ label, requests, layout = 'card', onUpdate, setCardRef }: Props) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.cardList}>
        {requests.map(r => (
          <RequestCard key={r.id} request={r} layout={layout} onUpdate={onUpdate} setCardRef={setCardRef} />
        ))}
      </div>
    </div>
  )
}
