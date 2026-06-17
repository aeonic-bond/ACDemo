export type RequestStatus =
  | 'draft'
  | 'requested'
  | 'in_progress'
  | 'needs_action'
  | 'partially_received'
  | 'received'
  | 'rejected'
  | 'on_hold'
  | 'canceled'

export type RequestCategory = 'police' | 'medical' | 'insurance'

export interface ActivityItem {
  at: string
  text: string
}

// Raw shape — mirrors case-documents.json exactly
export interface RawRequest {
  id: string
  category: RequestCategory
  document_type: string
  source: string
  status: RequestStatus
  assignee: string
  requested_at: string | null
  due_at: string | null
  updated_at: string
  action_required?: string
  reason?: string
  pages_received?: number
  pages_expected?: number
  activity?: ActivityItem[]
}

export interface RawCase {
  id: string
  matter_name: string
  client_name: string
  matter_type: string
  date_of_incident: string
  assigned_paralegal: string
  opened_at: string
}

export type Responsibility = 'internal' | 'external' | 'terminal'
export type CompletionState = 'complete' | 'partial' | 'incomplete'

// Processed shape — derived fields added, ready for components
export interface ProcessedRequest extends RawRequest {
  isOverdue: boolean
  needsAttention: boolean
  responsibility: Responsibility
  completionState: CompletionState
}

export interface ProcessedCase {
  case: RawCase
  requests: ProcessedRequest[]
}
