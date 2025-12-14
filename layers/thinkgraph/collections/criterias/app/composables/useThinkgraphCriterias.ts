import { z } from 'zod'

export const thinkgraphCriteriaSchema = z.object({
  decisionId: z.string().min(1, 'decisionId is required'),
  title: z.string().min(1, 'title is required'),
  description: z.string().optional(),
  weight: z.number().optional(),
  order: z.number().optional()
})

export const thinkgraphCriteriasColumns = [
  { accessorKey: 'decisionId', header: 'DecisionId' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'weight', header: 'Weight' },
  { accessorKey: 'order', header: 'Order' }
]

export const thinkgraphCriteriasConfig = {
  name: 'thinkgraphCriterias',
  layer: 'thinkgraph',
  apiPath: 'thinkgraph-criterias',
  componentName: 'ThinkgraphCriteriasForm',
  schema: thinkgraphCriteriaSchema,
  defaultValues: {
    decisionId: '',
    title: '',
    description: '',
    weight: 0,
    order: 0
  },
  columns: thinkgraphCriteriasColumns,
}

export const useThinkgraphCriterias = () => thinkgraphCriteriasConfig

// Default export for auto-import compatibility
export default function () {
  return {
    defaultValue: thinkgraphCriteriasConfig.defaultValues,
    schema: thinkgraphCriteriasConfig.schema,
    columns: thinkgraphCriteriasConfig.columns,
    collection: thinkgraphCriteriasConfig.name
  }
}