<template>
  <AppContainer title="Decision Flow">
    <template #actions>
      <UButton
        to="/dashboard/decisions"
        variant="outline"
        icon="i-lucide-list"
      >
        List View
      </UButton>
      <CroutonTableHeader
        :collection="'thinkgraphDecisions'"
        createButton
      />
    </template>

    <div class="h-[calc(100vh-200px)]">
      <CroutonFlow
        v-if="decisions && decisions.length > 0"
        :rows="decisions"
        collection="thinkgraphDecisions"
        parent-field="parentId"
        position-field="position"
        label-field="title"
        :controls="true"
        :minimap="true"
        :flow-config="{
          direction: 'TB',
          nodeSpacing: 80,
          rankSpacing: 120
        }"
        @node-click="handleNodeClick"
        @node-dbl-click="handleNodeDblClick"
      />
      <div v-else class="flex items-center justify-center h-full">
        <div class="text-center text-neutral-500">
          <UIcon name="i-lucide-git-branch" class="w-12 h-12 mx-auto mb-4" />
          <p class="text-lg font-medium">No decisions yet</p>
          <p class="text-sm">Create your first decision to see the flow visualization</p>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const { items: decisions, pending } = await useCollectionQuery('thinkgraphDecisions')

function handleNodeClick(nodeId: string, data: Record<string, unknown>) {
  // Single click - could show preview or do nothing
  console.log('Node clicked:', nodeId, data)
}

function handleNodeDblClick(nodeId: string, data: Record<string, unknown>) {
  // Double click - navigate to edit page
  navigateTo(`/dashboard/${route.params.team}/decisions/${nodeId}`)
}
</script>
