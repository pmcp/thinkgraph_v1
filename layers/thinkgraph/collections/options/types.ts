import type { z } from 'zod'
import type { thinkgraphOptionSchema } from './app/composables/useThinkgraphOptions'

export interface ThinkgraphOption {
  id: string
  teamId: string
  owner: string
  decisionId: string
  title: string
  description?: string
  pros?: any[]
  cons?: any[]
  order?: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  optimisticId?: string
  optimisticAction?: 'create' | 'update' | 'delete'
}

export type ThinkgraphOptionFormData = z.infer<typeof thinkgraphOptionSchema>
export type NewThinkgraphOption = Omit<ThinkgraphOption, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>

// Props type for the Form component
export interface ThinkgraphOptionFormProps {
  items: string[] // Array of IDs for delete action
  activeItem: ThinkgraphOption | Record<string, never> // ThinkgraphOption for update, empty object for create
  collection: string
  loading: string
  action: 'create' | 'update' | 'delete'
}