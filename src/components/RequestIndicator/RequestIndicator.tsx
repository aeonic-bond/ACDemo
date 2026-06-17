import type { RequestCategory, CompletionState } from '../../types/request'
import styles from './RequestIndicator.module.css'

interface Props {
  category: RequestCategory
  completionState: CompletionState
}

export function RequestIndicator({ category, completionState }: Props) {
  return (
    <div
      className={[
        styles.indicator,
        styles[category],
        styles[completionState],
      ].join(' ')}
      aria-label={`${category} — ${completionState}`}
    />
  )
}
