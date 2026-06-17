import { useState, useRef, useEffect } from 'react'
import { ChevronIcon } from '../icons'
import styles from './SortDropdown.module.css'

export type SortBy = 'urgency' | 'document_type' | 'assignee'

export const SORT_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Urgency',       value: 'urgency' },
  { label: 'Document Type', value: 'document_type' },
  { label: 'Assignee',      value: 'assignee' },
]

interface Props {
  value: SortBy
  onChange: (value: SortBy) => void
}

export function SortDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selectedLabel = SORT_OPTIONS.find(o => o.value === value)?.label ?? ''

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  function handleSelect(val: SortBy) {
    onChange(val)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>Sort: {selectedLabel}</span>
        <ChevronIcon direction={isOpen ? 'up' : 'down'} size={10} />
      </button>
      {isOpen && (
        <div className={styles.menu} role="listbox">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.option} ${opt.value === value ? styles.optionActive : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
              {opt.value === value && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
