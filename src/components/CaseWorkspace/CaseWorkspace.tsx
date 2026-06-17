import { useState, useMemo, useCallback } from 'react'
import type { ProcessedCase, ProcessedRequest, RawRequest } from '../../types/request'
import type { ViewMode } from '../ViewToggle'
import type { GroupBy } from '../CaseBoard'
import type { SortBy } from '../SortDropdown'
import { AssigneeFilterBar } from '../AssigneeFilterBar'
import { GroupByBar } from '../GroupByBar'
import { ViewToggle } from '../ViewToggle'
import { SortDropdown } from '../SortDropdown'
import { CaseBoard, GROUP_BY_OPTIONS } from '../CaseBoard'
import { deriveAssignees } from '../../lib/deriveAssignees'
import { reprocessRequest } from '../../lib/transformCase'
import styles from './CaseWorkspace.module.css'

function sortRequests(requests: ProcessedRequest[], sortBy: SortBy): ProcessedRequest[] {
  return [...requests].sort((a, b) => {
    switch (sortBy) {
      case 'urgency': {
        const weight = { incomplete: 0, partial: 0, complete: 1 }
        const wDiff = weight[a.completionState] - weight[b.completionState]
        if (wDiff !== 0) return wDiff
        if (!a.due_at && !b.due_at) return 0
        if (!a.due_at) return 1
        if (!b.due_at) return -1
        return new Date(a.due_at).getTime() - new Date(b.due_at).getTime()
      }
      case 'document_type':
        return a.document_type.localeCompare(b.document_type)
      case 'assignee':
        return a.assignee.localeCompare(b.assignee)
    }
  })
}

interface Props {
  data: ProcessedCase
}

export function CaseWorkspace({ data }: Props) {
  const [requests, setRequests] = useState<ProcessedRequest[]>(data.requests)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [groupBy, setGroupBy] = useState<GroupBy>('responsibility')
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortBy>('urgency')

  // --- FLIP ANIMATION ---
  const [movedId, setMovedId] = useState<string | null>(null)
  // --- END FLIP ANIMATION ---

  const handleUpdate = useCallback((id: string, patch: Partial<RawRequest>) => {
    // --- FLIP ANIMATION ---
    setMovedId(id)
    setTimeout(() => setMovedId(null), 380)
    // --- END FLIP ANIMATION ---
    setRequests(prev => prev.map(r =>
      r.id === id ? reprocessRequest({ ...r, ...patch }) : r
    ))
  }, [])

  const assignees = useMemo(() => deriveAssignees(requests), [requests])

  const filteredRequests = useMemo(
    () => assigneeFilter
      ? requests.filter(r => r.assignee === assigneeFilter)
      : requests,
    [requests, assigneeFilter]
  )

  const sortedRequests = useMemo(
    () => sortRequests(filteredRequests, sortBy),
    [filteredRequests, sortBy]
  )

  const layout = viewMode === 'grid' ? 'card' : 'row'

  return (
    <div className={styles.workspace}>
      <div className={styles.assigneeBar}>
        <AssigneeFilterBar
          lead={data.case.assigned_paralegal}
          assignees={assignees}
          value={assigneeFilter}
          onChange={setAssigneeFilter}
        />
      </div>
      <div className={styles.controlsBar}>
        <GroupByBar
          options={GROUP_BY_OPTIONS}
          value={groupBy}
          onChange={v => setGroupBy(v as GroupBy)}
        />
        <div className={styles.viewControls}>
          <SortDropdown value={sortBy} onChange={setSortBy} />
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>
      <div className={styles.board}>
        <CaseBoard
          requests={sortedRequests}
          layout={layout}
          groupBy={groupBy}
          onUpdate={handleUpdate}
          movedId={movedId}
        />
      </div>
    </div>
  )
}
