import { useState, useMemo } from 'react'
import type { ProcessedRequest, RawRequest, RequestStatus } from '../../types/request'
import { Avatar } from '../Avatar'
import { ChevronIcon, DotsHorizontalIcon } from '../icons'
import { RequestIndicator } from '../RequestIndicator'
import { StatusBadge } from '../StatusBadge'
import styles from './RequestCard.module.css'

interface Props {
  request: ProcessedRequest
  layout?: 'card' | 'row'
  onUpdate?: (id: string, patch: Partial<RawRequest>) => void
  // --- FLIP ANIMATION ---
  setCardRef?: (id: string) => (el: HTMLElement | null) => void
  // --- END FLIP ANIMATION ---
}

function formatDueDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatActivityDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function statusLabel(status: ProcessedRequest['status']): string {
  switch (status) {
    case 'needs_action':       return 'Needs Action'
    case 'in_progress':        return 'In Progress'
    case 'requested':          return 'Requested'
    case 'partially_received': return 'Partially Received'
    case 'received':           return 'Received'
    case 'rejected':           return 'Rejected'
    case 'on_hold':            return 'On Hold'
    case 'draft':              return 'Draft'
    case 'canceled':           return 'Canceled'
  }
}

function formatOverdueDuration(dueDateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dueDateStr).getTime()) / (1000 * 60 * 60 * 24))
  if (days < 60) return `${days} day${days === 1 ? '' : 's'}`
  const months = Math.floor(days / 30)
  return `${months} month${months === 1 ? '' : 's'}`
}

function originEntry(request: ProcessedRequest): { at: string; text: string } | null {
  const at = request.requested_at ?? request.updated_at
  if (!at) return null
  const text = request.requested_at
    ? 'Requested'
    : request.status === 'draft' ? 'Draft created' : 'Created'
  return { at, text }
}

function actionForStatus(status: RequestStatus): { label: string; targetStatus: RequestStatus } | null {
  switch (status) {
    case 'needs_action':
    case 'on_hold':
      return { label: 'Mark In Progress', targetStatus: 'in_progress' }
    case 'requested':
    case 'in_progress':
    case 'partially_received':
      return { label: 'Mark Received', targetStatus: 'received' }
    case 'rejected':
      return { label: 'Re-request', targetStatus: 'requested' }
    default:
      return null
  }
}

export function RequestCard({ request, layout = 'card', onUpdate, setCardRef }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  // --- FLIP ANIMATION ---
  const cardRef = useMemo(() => setCardRef?.(request.id), [setCardRef, request.id])
  // --- END FLIP ANIMATION ---
  const activities = request.activity ?? []
  const visibleActivities = isExpanded
    ? [...activities].reverse()
    : activities.length > 0 ? [activities[activities.length - 1]] : []
  const origin = originEntry(request)
  const action = actionForStatus(request.status)

  function handleAction() {
    if (!action || !onUpdate) return
    onUpdate(request.id, {
      status: action.targetStatus,
      activity: [...(request.activity ?? []), {
        at: new Date().toISOString(),
        text: action.label,
      }],
    })
    setIsExpanded(false)
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${layout === 'row' ? styles.cardRow : ''} ${request.needsAttention ? styles.cardAttention : ''}`}
    >

      <div className={styles.body}>
        <div className={styles.header}>
          <RequestIndicator category={request.category} completionState={request.completionState} />
          <div className={styles.info}>
            <p className={styles.title}>{request.document_type}</p>
            <p className={styles.source}>{request.source}</p>
          </div>
        </div>

        <div className={styles.bodyContent}>
        {(request.action_required || request.reason || (request.status === 'partially_received' && request.pages_received != null) || activities.length > 0 || (isExpanded && origin)) && (
          <div className={styles.activityFeed}>
            {request.action_required && (
              <div className={styles.alertMessage}>
                <p>{request.action_required}</p>
              </div>
            )}
            {request.reason && (
              <div className={styles.alertMessage}>
                <p>{request.reason}</p>
              </div>
            )}
            {request.status === 'partially_received' && request.pages_received != null && request.pages_expected != null && (
              <div className={styles.alertMessage}>
                <p>{request.pages_received} of {request.pages_expected} pages received</p>
              </div>
            )}
            {visibleActivities.map((entry) => (
              <div key={entry.at + entry.text} className={styles.activityEntry}>
                <span className={styles.activityDate}>{formatActivityDate(entry.at)}</span>
                <p className={styles.activityText}>{entry.text}</p>
              </div>
            ))}
            {isExpanded && origin && (
              <div className={styles.originEntry}>
                <span className={styles.activityDate}>{formatActivityDate(origin.at)}</span>
                <p className={styles.activityText}>{origin.text}</p>
              </div>
            )}
          </div>
        )}

        {isExpanded && action && (
          <div className={styles.actionCenter}>
            <button className={styles.actionBtn} onClick={handleAction}>
              {action.label}
            </button>
            <button className={styles.actionDots} aria-label="More actions">
              <DotsHorizontalIcon size={16} />
            </button>
          </div>
        )}
        </div>
      </div>

      <button
        className={`${styles.footer} ${request.needsAttention ? styles.footerAttention : ''}`}
        onClick={() => setIsExpanded(e => !e)}
        aria-expanded={isExpanded}
      >
        <div className={styles.footerLeading}>
          <Avatar name={request.assignee} variant="light" />
          {request.due_at && (
            <span className={`${styles.dueDate} ${request.isOverdue ? styles.dueDateOverdue : ''}`}>
              {request.isOverdue
                ? `Overdue · ${formatOverdueDuration(request.due_at)}`
                : formatDueDate(request.due_at)}
            </span>
          )}
        </div>
        <div className={styles.footerTrailing}>
          <StatusBadge label={statusLabel(request.status)} needsAttention={request.needsAttention} />
          <div className={styles.chevronWrap}>
            <ChevronIcon direction={isExpanded ? 'up' : 'down'} size={12} />
          </div>
        </div>
      </button>

    </div>
  )
}
