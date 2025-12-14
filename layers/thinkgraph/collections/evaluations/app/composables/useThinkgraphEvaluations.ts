import { z } from 'zod'

export const thinkgraphEvaluationSchema = z.object({
  decisionId: z.string().min(1, 'decisionId is required'),
  optionId: z.string().min(1, 'optionId is required'),
  criteriaId: z.string().min(1, 'criteriaId is required'),
  score: z.number(),
  notes: z.string().optional()
})

export const thinkgraphEvaluationsColumns = [
  { accessorKey: 'decisionId', header: 'DecisionId' },
  { accessorKey: 'optionId', header: 'OptionId' },
  { accessorKey: 'criteriaId', header: 'CriteriaId' },
  { accessorKey: 'score', header: 'Score' },
  { accessorKey: 'notes', header: 'Notes' }
]

export const thinkgraphEvaluationsConfig = {
  name: 'thinkgraphEvaluations',
  layer: 'thinkgraph',
  apiPath: 'thinkgraph-evaluations',
  componentName: 'ThinkgraphEvaluationsForm',
  schema: thinkgraphEvaluationSchema,
  defaultValues: {
    decisionId: '',
    optionId: '',
    criteriaId: '',
    score: 0,
    notes: ''
  },
  columns: thinkgraphEvaluationsColumns,
}

export const useThinkgraphEvaluations = () => thinkgraphEvaluationsConfig

// Default export for auto-import compatibility
export default function () {
  return {
    defaultValue: thinkgraphEvaluationsConfig.defaultValues,
    schema: thinkgraphEvaluationsConfig.schema,
    columns: thinkgraphEvaluationsConfig.columns,
    collection: thinkgraphEvaluationsConfig.name
  }
}