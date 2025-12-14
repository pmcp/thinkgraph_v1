import { z } from 'zod'

export const thinkgraphNoteSchema = z.object({
  entityType: z.string().min(1, 'entityType is required'),
  entityId: z.string().min(1, 'entityId is required'),
  content: z.string().min(1, 'content is required'),
  type: z.array(z.string()).optional()
})

export const thinkgraphNotesColumns = [
  { accessorKey: 'entityType', header: 'EntityType' },
  { accessorKey: 'entityId', header: 'EntityId' },
  { accessorKey: 'content', header: 'Content' },
  { accessorKey: 'type', header: 'Type' }
]

export const thinkgraphNotesConfig = {
  name: 'thinkgraphNotes',
  layer: 'thinkgraph',
  apiPath: 'thinkgraph-notes',
  componentName: 'ThinkgraphNotesForm',
  schema: thinkgraphNoteSchema,
  defaultValues: {
    entityType: '',
    entityId: '',
    content: '',
    type: null
  },
  columns: thinkgraphNotesColumns,
  dependentFieldComponents: {
    type: 'ThinkgraphNotesTypeSelect'
  },
}

export const useThinkgraphNotes = () => thinkgraphNotesConfig

// Default export for auto-import compatibility
export default function () {
  return {
    defaultValue: thinkgraphNotesConfig.defaultValues,
    schema: thinkgraphNotesConfig.schema,
    columns: thinkgraphNotesConfig.columns,
    collection: thinkgraphNotesConfig.name
  }
}