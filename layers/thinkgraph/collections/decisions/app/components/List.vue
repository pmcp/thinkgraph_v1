<template>
  <CroutonCollection
    :layout="layout"
    collection="thinkgraphDecisions"
    :columns="columns"
    :rows="decisions || []"
    :loading="pending"
  >
    <template #header>
      <CroutonTableHeader
        title="ThinkgraphDecisions"
        :collection="'thinkgraphDecisions'"
        createButton
      />
    </template>
    <template #dueDate-cell="{ row }">
      <CroutonDate :date="row.original.dueDate"></CroutonDate>
    </template>
    <template #description-cell="{ row }">
      <span class="line-clamp-2 text-sm text-neutral-500">{{ row.original.description?.replace(/<[^>]*>/g, '').substring(0, 100) }}</span>
    </template>
  </CroutonCollection>
</template>

<script setup lang="ts">
import useThinkgraphDecisions from '../composables/useThinkgraphDecisions'

const props = withDefaults(defineProps<{
  layout?: any
}>(), {
  layout: 'table'
})

const { columns } = useThinkgraphDecisions()

const { items: decisions, pending } = await useCollectionQuery(
  'thinkgraphDecisions'
)
</script>