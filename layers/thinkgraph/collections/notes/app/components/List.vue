<template>
  <CroutonCollection
    :layout="layout"
    collection="thinkgraphNotes"
    :columns="columns"
    :rows="notes || []"
    :loading="pending"
  >
    <template #header>
      <CroutonTableHeader
        title="ThinkgraphNotes"
        :collection="'thinkgraphNotes'"
        createButton
      />
    </template>
    <template #content-cell="{ row }">
      <CroutonEditorPreview :content="row.original.content" />
    </template>
  </CroutonCollection>
</template>

<script setup lang="ts">
import useThinkgraphNotes from '../composables/useThinkgraphNotes'

const props = withDefaults(defineProps<{
  layout?: any
}>(), {
  layout: 'table'
})

const { columns } = useThinkgraphNotes()

const { items: notes, pending } = await useCollectionQuery(
  'thinkgraphNotes'
)
</script>