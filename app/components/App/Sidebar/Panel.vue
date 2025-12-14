<template>
  <!-- Desktop: always rendered, CSS handles visibility -->
  <div
    class="relative hidden flex-col items-stretch overflow-hidden border-r border-neutral-200 bg-neutral-100 p-2 lg:flex lg:w-64 dark:border-neutral-900 dark:bg-black"
  >
    <slot />
  </div>

  <!-- Mobile: only render on client to avoid hydration mismatch -->
  <ClientOnly>
    <USlideover
      v-if="smallerThanLg"
      v-model:open="model"
      side="left"
      :ui="{ content: 'max-w-[75%] sm:max-w-[50%]' }"
    >
      <template #content>
        <div class="flex h-full flex-col p-2">
          <slot />
        </div>
      </template>
    </USlideover>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const model = defineModel<boolean>({ required: true })
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
</script>
