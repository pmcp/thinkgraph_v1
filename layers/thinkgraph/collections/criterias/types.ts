import type { z } from 'zod'
import type { thinkgraphCriteriaSchema } from './app/composables/useThinkgraphCriterias'

export interface ThinkgraphCriteria {
  id: string
  teamId: string
  owner: string
  decisionId: string
  title: string
  description?: string
  weight?: number
  order?: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  optimisticId?: string
  optimisticAction?: 'create' | 'update' | 'delete'
}

export type ThinkgraphCriteriaFormData = z.infer<typeof thinkgraphCriteriaSchema>
export type NewThinkgraphCriteria = Omit<ThinkgraphCriteria, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>

// Props type for the Form component
export interface ThinkgraphCriteriaFormProps {
  items: string[] // Array of IDs for delete action
  activeItem: ThinkgraphCriteria | Record<string, never> // ThinkgraphCriteria for update, empty object for create
  collection: string
  loading: string
  action: 'create' | 'update' | 'delete'
}