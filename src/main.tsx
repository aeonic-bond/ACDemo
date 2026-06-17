import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CaseView } from './components/CaseView'
import { transformCase } from './lib/transformCase'
import './styles/global.css'
import styles from './appShell.module.css'

const data = transformCase()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={styles.shell}>
      <div className={styles.sidebar} />
      <div className={styles.rightContainer}>
        <CaseView data={data} />
      </div>
    </div>
  </StrictMode>,
)
