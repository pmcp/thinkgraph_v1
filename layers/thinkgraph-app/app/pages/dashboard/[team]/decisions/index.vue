<template>
  <AppContainer title="Decisions">
    <template #actions>
      <UButton
        to="decisions/flow"
        variant="outline"
        icon="i-lucide-git-branch"
      >
        Flow View
      </UButton>
    </template>
    <ThinkgraphDecisionsList />
  </AppContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>
