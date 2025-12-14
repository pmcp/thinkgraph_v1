import { z } from 'zod'

export const thinkgraphDecisionSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().optional(),
  status: z.array(z.string()).optional(),
  parentId: z.string().nullable().optional(),
  position: z.record(z.any()).optional(),
  dueDate: z.date().optional(),
  priority: z.array(z.string()).optional(),
  outcome: z.string().optional(),
})

export const thinkgraphDecisionsColumns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'parentId', header: 'ParentId' },
  { accessorKey: 'position', header: 'Position' },
  { accessorKey: 'dueDate', header: 'DueDate' },
  { accessorKey: 'priority', header: 'Priority' },
  { accessorKey: 'outcome', header: 'Outcome' }
]

export const thinkgraphDecisionsConfig = {
  name: 'thinkgraphDecisions',
  layer: 'thinkgraph',
  apiPath: 'thinkgraph-decisions',
  componentName: 'ThinkgraphDecisionsForm',
  schema: thinkgraphDecisionSchema,
  defaultValues: {
    title: '',
    description: '',
    status: null,
    parentId: null,
    position: {},
    dueDate: null,
    priority: null,
    outcome: '',
  },
  columns: thinkgraphDecisionsColumns,
  dependentFieldComponents: {
    status: 'ThinkgraphDecisionsStatuSelect',
    priority: 'ThinkgraphDecisionsPrioritySelect'
  },
  hierarchy: {
    enabled: true,
    parentField: 'parentId',
    pathField: 'path',
    depthField: 'depth',
    orderField: 'order'
  },
}

export const useThinkgraphDecisions = () => thinkgraphDecisionsConfig

// Default export for auto-import compatibility
export default function () {
  return {
    defaultValue: thinkgraphDecisionsConfig.defaultValues,
    schema: thinkgraphDecisionsConfig.schema,
    columns: thinkgraphDecisionsConfig.columns,
    collection: thinkgraphDecisionsConfig.name
  }
}