import type { z } from 'zod'
import type { thinkgraphDecisionSchema } from './app/composables/useThinkgraphDecisions'

export interface ThinkgraphDecision {
  id: string
  teamId: string
  owner: string
  title: string
  description?: string
  status?: string[] | null
  parentId?: string
  position?: Record<string, any>
  dueDate?: Date | null
  priority?: string[] | null
  outcome?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  optimisticId?: string
  optimisticAction?: 'create' | 'update' | 'delete'
}

export type ThinkgraphDecisionFormData = z.infer<typeof thinkgraphDecisionSchema>
export type NewThinkgraphDecision = Omit<ThinkgraphDecision, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>

// Props type for the Form component
export interface ThinkgraphDecisionFormProps {
  items: string[] // Array of IDs for delete action
  activeItem: ThinkgraphDecision | Record<string, never> // ThinkgraphDecision for update, empty object for create
  collection: string
  loading: string
  action: 'create' | 'update' | 'delete'
}