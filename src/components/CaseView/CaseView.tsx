import type { ProcessedCase } from '../../types/request'
import { HeaderBar } from '../HeaderBar'
import { CaseWorkspace } from '../CaseWorkspace'
import styles from './CaseView.module.css'

interface Props {
  data: ProcessedCase
}

export function CaseView({ data }: Props) {
  return (
    <div className={styles.view}>
      <HeaderBar case={data.case} />
      <div className={styles.scrollArea}>
        <CaseWorkspace data={data} />
      </div>
    </div>
  )
}
