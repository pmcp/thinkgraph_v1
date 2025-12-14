<template>
  <AppContainer title="Decision Flow" :padding="false">
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

    <div class="relative w-full" style="height: calc(100vh - 4rem);">
      <ClientOnly>
        <CroutonFlow
          v-if="!pending && decisions && decisions.length > 0"
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
          class="w-full h-full"
          @node-click="handleNodeClick"
          @node-dbl-click="handleNodeDblClick"
        />
        <div v-else-if="!pending && (!decisions || decisions.length === 0)" class="flex items-center justify-center h-full">
          <div class="text-center text-neutral-500">
            <UIcon name="i-lucide-git-branch" class="w-12 h-12 mx-auto mb-4" />
            <p class="text-lg font-medium">No decisions yet</p>
            <p class="text-sm">Create your first decision to see the flow visualization</p>
          </div>
        </div>
        <template #fallback>
          <div class="flex items-center justify-center h-full">
            <div class="w-8 h-8 border-2 border-neutral-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { items: decisions, pending } = await useCollectionQuery('thinkgraphDecisions')
const { open } = useCrouton()

function handleNodeClick(nodeId: string, data: Record<string, unknown>) {
  open('update', 'thinkgraphDecisions', [nodeId])
}

function handleNodeDblClick(nodeId: string, data: Record<string, unknown>) {
  open('update', 'thinkgraphDecisions', [nodeId])
}
</script>
