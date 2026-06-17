import { AssigneeChip } from '../AssigneeChip'
import styles from './AssigneeFilterBar.module.css'

export interface Assignee {
  name: string
  count: number
}

interface Props {
  assignees: Assignee[]
  value: string | null
  onChange: (value: string | null) => void
  lead?: string
}

export function AssigneeFilterBar({ assignees, value, onChange, lead }: Props) {
  return (
    <div className={styles.bar}>
      {lead && (
        <span className={styles.lead}>
          Lead: <span className={styles.leadName}>{lead}</span>
        </span>
      )}
      {assignees.map(a => (
        <AssigneeChip
          key={a.name}
          name={a.name}
          count={a.count}
          active={a.name === value}
          onClick={() => onChange(a.name === value ? null : a.name)}
        />
      ))}
    </div>
  )
}
