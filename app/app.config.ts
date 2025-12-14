import { thinkgraphDecisionsConfig } from '../layers/thinkgraph/collections/decisions/app/composables/useThinkgraphDecisions'
import { thinkgraphOptionsConfig } from '../layers/thinkgraph/collections/options/app/composables/useThinkgraphOptions'
import { thinkgraphCriteriasConfig } from '../layers/thinkgraph/collections/criterias/app/composables/useThinkgraphCriterias'
import { thinkgraphEvaluationsConfig } from '../layers/thinkgraph/collections/evaluations/app/composables/useThinkgraphEvaluations'
import { thinkgraphNotesConfig } from '../layers/thinkgraph/collections/notes/app/composables/useThinkgraphNotes'

export default defineAppConfig({
  croutonCollections: {
    thinkgraphDecisions: {
      ...thinkgraphDecisionsConfig,
      references: {
        parentId: 'thinkgraphDecisions',
        outcome: 'thinkgraphOptions',
      },
    },
    thinkgraphOptions: {
      ...thinkgraphOptionsConfig,
      references: {
        decisionId: 'thinkgraphDecisions',
      },
    },
    thinkgraphCriterias: {
      ...thinkgraphCriteriasConfig,
      references: {
        decisionId: 'thinkgraphDecisions',
      },
    },
    thinkgraphEvaluations: {
      ...thinkgraphEvaluationsConfig,
      references: {
        decisionId: 'thinkgraphDecisions',
        optionId: 'thinkgraphOptions',
        criteriaId: 'thinkgraphCriterias',
      },
    },
    thinkgraphNotes: thinkgraphNotesConfig,
  },
  ui: {
    icons: {
      loading: 'i-lucide-loader-circle',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
  },
  seo: {
    title: 'ThinkGraph',
    description: 'Structured thinking and decision-making tool',
  },
})
