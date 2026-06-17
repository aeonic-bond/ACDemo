import type { ProcessedRequest } from '../types/request'
import type { Assignee } from '../components/AssigneeFilterBar'

export function deriveAssignees(requests: ProcessedRequest[]): Assignee[] {
  const counts = new Map<string, number>()
  for (const r of requests) {
    counts.set(r.assignee, (counts.get(r.assignee) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([name, count]) => ({ name, count }))
}
