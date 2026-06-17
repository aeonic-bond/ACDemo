import type { RawRequest, ProcessedRequest, ProcessedCase, Responsibility, CompletionState } from '../types/request'
import caseData from '../data/case-documents.json'

const COMPLETE_STATUSES = new Set(['received', 'canceled'])

function isOverdue(request: RawRequest): boolean {
  if (!request.due_at) return false
  if (COMPLETE_STATUSES.has(request.status)) return false
  return new Date(request.due_at) < new Date()
}

function needsAttention(request: RawRequest): boolean {
  return (
    request.status === 'needs_action' ||
    request.status === 'rejected' ||
    request.status === 'on_hold' ||
    request.status === 'partially_received' ||
    isOverdue(request)
  )
}

function deriveCompletionState(request: RawRequest): CompletionState {
  switch (request.status) {
    case 'received':           return 'complete'
    case 'partially_received': return 'partial'
    default:                   return 'incomplete'
  }
}

function deriveResponsibility(request: RawRequest): Responsibility {
  switch (request.status) {
    case 'needs_action':
    case 'rejected':
    // NOTE: rejected assumes resubmission is always the intent. A truly final
    // rejection with no resubmission path is closer to terminal — if that case
    // arises, a separate status would be the cleaner fix.
    case 'draft':
      return 'internal'

    case 'in_progress':
    case 'requested':
      return 'external'

    case 'on_hold':
      // AMBIGUOUS: on_hold does not encode who is blocking. req_009 is internal
      // (awaiting accounting approval) but a provider being temporarily unavailable
      // would be external. Defaulting to internal since most holds in this domain
      // require an internal step to unblock. A richer system could infer this from
      // the reason or activity fields with LLM.
      return 'internal'

    case 'partially_received':
      // AMBIGUOUS: responsibility depends on whether the provider has committed
      // to sending the remainder or if the team needs to follow up. Defaulting
      // to external (provider still owes documents). A richer system could infer 
      // this from the reason or activity fields with LLM.
      return 'external'

    case 'received':
    case 'canceled':
      return 'terminal'
  }
}

export function reprocessRequest(request: RawRequest): ProcessedRequest {
  return {
    ...request,
    isOverdue: isOverdue(request),
    needsAttention: needsAttention(request),
    responsibility: deriveResponsibility(request),
    completionState: deriveCompletionState(request),
  }
}

export function transformCase(): ProcessedCase {
  return {
    case: caseData.case,
    requests: (caseData.requests as RawRequest[]).map(reprocessRequest),
  }
}
