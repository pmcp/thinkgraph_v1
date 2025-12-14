<template>
  <CroutonCollection
    :layout="layout"
    collection="thinkgraphCriterias"
    :columns="columns"
    :rows="criterias || []"
    :loading="pending"
  >
    <template #header>
      <CroutonTableHeader
        title="ThinkgraphCriterias"
        :collection="'thinkgraphCriterias'"
        createButton
      />
    </template>
  </CroutonCollection>
</template>

<script setup lang="ts">
import useThinkgraphCriterias from '../composables/useThinkgraphCriterias'

const props = withDefaults(defineProps<{
  layout?: any
}>(), {
  layout: 'table'
})

const { columns } = useThinkgraphCriterias()

const { items: criterias, pending } = await useCollectionQuery(
  'thinkgraphCriterias'
)
</script>