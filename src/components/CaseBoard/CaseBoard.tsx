import type { ProcessedRequest, RawRequest } from '../../types/request'
import { RequestColumn } from '../RequestColumn'
// --- FLIP ANIMATION ---
import { useFlipMove } from '../../hooks/useFlipMove'
// --- END FLIP ANIMATION ---
import styles from './CaseBoard.module.css'

export type GroupBy = 'responsibility' | 'category'

interface ColumnDef {
  key: string
  label: string
  filter: (r: ProcessedRequest) => boolean
}

const COLUMN_CONFIGS: Record<GroupBy, ColumnDef[]> = {
  responsibility: [
    { key: 'internal', label: 'Internal Action Required', filter: r => r.responsibility === 'internal' },
    { key: 'external', label: 'External Response Pending', filter: r => r.responsibility === 'external' },
    { key: 'terminal', label: 'None',                      filter: r => r.responsibility === 'terminal' },
  ],
  category: [
    { key: 'medical',   label: 'Medical',   filter: r => r.category === 'medical'   },
    { key: 'police',    label: 'Police',    filter: r => r.category === 'police'    },
    { key: 'insurance', label: 'Insurance', filter: r => r.category === 'insurance' },
  ],
}

export const GROUP_BY_OPTIONS = [
  { label: 'Next Step',  value: 'responsibility' as GroupBy },
  { label: 'Category',   value: 'category'       as GroupBy },
]

interface Props {
  requests: ProcessedRequest[]
  layout?: 'card' | 'row'
  groupBy?: GroupBy
  onUpdate?: (id: string, patch: Partial<RawRequest>) => void
  // --- FLIP ANIMATION ---
  movedId?: string | null
  // --- END FLIP ANIMATION ---
}

export function CaseBoard({ requests, layout = 'card', groupBy = 'responsibility', onUpdate, movedId = null }: Props) {
  const columns = COLUMN_CONFIGS[groupBy]

  // --- FLIP ANIMATION ---
  const orderKey = columns.flatMap(col => requests.filter(col.filter).map(r => r.id)).join('|')
  const setCardRef = useFlipMove(orderKey, movedId)
  // --- END FLIP ANIMATION ---

  return (
    <div className={`${styles.board} ${layout === 'row' ? styles.boardRow : ''}`}>
      {columns.map(col => (
        <RequestColumn
          key={col.key}
          label={col.label}
          requests={requests.filter(col.filter)}
          layout={layout}
          onUpdate={onUpdate}
          setCardRef={setCardRef}
        />
      ))}
    </div>
  )
}
