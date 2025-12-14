import { z } from 'zod'

export const thinkgraphOptionSchema = z.object({
  decisionId: z.string().min(1, 'decisionId is required'),
  title: z.string().min(1, 'title is required'),
  description: z.string().optional(),
  pros: z.array(z.any()).optional(),
  cons: z.array(z.any()).optional(),
  order: z.number().optional()
})

export const thinkgraphOptionsColumns = [
  { accessorKey: 'decisionId', header: 'DecisionId' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'pros', header: 'Pros' },
  { accessorKey: 'cons', header: 'Cons' },
  { accessorKey: 'order', header: 'Order' }
]

export const thinkgraphOptionsConfig = {
  name: 'thinkgraphOptions',
  layer: 'thinkgraph',
  apiPath: 'thinkgraph-options',
  componentName: 'ThinkgraphOptionsForm',
  schema: thinkgraphOptionSchema,
  defaultValues: {
    decisionId: '',
    title: '',
    description: '',
    pros: [],
    cons: [],
    order: 0
  },
  columns: thinkgraphOptionsColumns,
  dependentFieldComponents: {
    pros: 'ThinkgraphOptionsProSelect',
    cons: 'ThinkgraphOptionsConSelect'
  },
}

export const useThinkgraphOptions = () => thinkgraphOptionsConfig

// Default export for auto-import compatibility
export default function () {
  return {
    defaultValue: thinkgraphOptionsConfig.defaultValues,
    schema: thinkgraphOptionsConfig.schema,
    columns: thinkgraphOptionsConfig.columns,
    collection: thinkgraphOptionsConfig.name
  }
}