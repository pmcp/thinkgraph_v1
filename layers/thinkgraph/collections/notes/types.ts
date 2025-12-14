import type { z } from 'zod'
import type { thinkgraphNoteSchema } from './app/composables/useThinkgraphNotes'

export interface ThinkgraphNote {
  id: string
  teamId: string
  owner: string
  entityType: string
  entityId: string
  content: string
  type?: string[] | null
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  optimisticId?: string
  optimisticAction?: 'create' | 'update' | 'delete'
}

export type ThinkgraphNoteFormData = z.infer<typeof thinkgraphNoteSchema>
export type NewThinkgraphNote = Omit<ThinkgraphNote, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>

// Props type for the Form component
export interface ThinkgraphNoteFormProps {
  items: string[] // Array of IDs for delete action
  activeItem: ThinkgraphNote | Record<string, never> // ThinkgraphNote for update, empty object for create
  collection: string
  loading: string
  action: 'create' | 'update' | 'delete'
}