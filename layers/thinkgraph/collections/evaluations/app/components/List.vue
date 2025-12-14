<template>
  <CroutonCollection
    :layout="layout"
    collection="thinkgraphEvaluations"
    :columns="columns"
    :rows="evaluations || []"
    :loading="pending"
  >
    <template #header>
      <CroutonTableHeader
        title="ThinkgraphEvaluations"
        :collection="'thinkgraphEvaluations'"
        createButton
      />
    </template>
  </CroutonCollection>
</template>

<script setup lang="ts">
import useThinkgraphEvaluations from '../composables/useThinkgraphEvaluations'

const props = withDefaults(defineProps<{
  layout?: any
}>(), {
  layout: 'table'
})

const { columns } = useThinkgraphEvaluations()

const { items: evaluations, pending } = await useCollectionQuery(
  'thinkgraphEvaluations'
)
</script>