import type { z } from 'zod'
import type { thinkgraphEvaluationSchema } from './app/composables/useThinkgraphEvaluations'

export interface ThinkgraphEvaluation {
  id: string
  teamId: string
  owner: string
  decisionId: string
  optionId: string
  criteriaId: string
  score: number
  notes?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  optimisticId?: string
  optimisticAction?: 'create' | 'update' | 'delete'
}

export type ThinkgraphEvaluationFormData = z.infer<typeof thinkgraphEvaluationSchema>
export type NewThinkgraphEvaluation = Omit<ThinkgraphEvaluation, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>

// Props type for the Form component
export interface ThinkgraphEvaluationFormProps {
  items: string[] // Array of IDs for delete action
  activeItem: ThinkgraphEvaluation | Record<string, never> // ThinkgraphEvaluation for update, empty object for create
  collection: string
  loading: string
  action: 'create' | 'update' | 'delete'
}