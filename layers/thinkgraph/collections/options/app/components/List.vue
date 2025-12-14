<template>
  <CroutonCollection
    :layout="layout"
    collection="thinkgraphOptions"
    :columns="columns"
    :rows="options || []"
    :loading="pending"
  >
    <template #header>
      <CroutonTableHeader
        title="ThinkgraphOptions"
        :collection="'thinkgraphOptions'"
        createButton
      />
    </template>
    <template #pros-cell="{ row }">
      <ThinkgraphOptionsProCardMini :value="row.original.pros" />
    </template>
    <template #cons-cell="{ row }">
      <ThinkgraphOptionsConCardMini :value="row.original.cons" />
    </template>
    <template #description-cell="{ row }">
      <CroutonEditorPreview :content="row.original.description" />
    </template>
  </CroutonCollection>
</template>

<script setup lang="ts">
import useThinkgraphOptions from '../composables/useThinkgraphOptions'

const props = withDefaults(defineProps<{
  layout?: any
}>(), {
  layout: 'table'
})

const { columns } = useThinkgraphOptions()

const { items: options, pending } = await useCollectionQuery(
  'thinkgraphOptions'
)
</script>