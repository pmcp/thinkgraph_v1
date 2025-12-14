<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

interface Props {
  data: Record<string, unknown>
  selected?: boolean
  dragging?: boolean
  label?: string
}

const props = defineProps<Props>()

const statusColors: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  evaluating: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  decided: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  archived: 'bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400',
}

const priorityIcons: Record<string, string> = {
  low: 'i-lucide-arrow-down',
  medium: 'i-lucide-minus',
  high: 'i-lucide-arrow-up',
  urgent: 'i-lucide-alert-triangle',
}

const status = computed(() => (props.data.status as string) || 'draft')
const priority = computed(() => props.data.priority as string)
</script>

<template>
  <div
    class="decision-node"
    :class="{
      'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-neutral-900': selected,
      'opacity-75': dragging
    }"
  >
    <!-- Input handle -->
    <Handle
      type="target"
      :position="Position.Top"
      class="!bg-neutral-400 dark:!bg-neutral-600 !w-3 !h-3 !border-2 !border-white dark:!border-neutral-900"
    />

    <!-- Node content -->
    <div class="node-content">
      <!-- Header with status -->
      <div class="flex items-center justify-between gap-2 mb-2">
        <span
          class="text-xs font-medium px-2 py-0.5 rounded-full"
          :class="statusColors[status]"
        >
          {{ status.replace('_', ' ') }}
        </span>
        <UIcon
          v-if="priority && priorityIcons[priority]"
          :name="priorityIcons[priority]"
          class="w-4 h-4"
          :class="{
            'text-neutral-400': priority === 'low',
            'text-neutral-500': priority === 'medium',
            'text-amber-500': priority === 'high',
            'text-red-500': priority === 'urgent',
          }"
        />
      </div>

      <!-- Title -->
      <p class="font-semibold text-sm text-neutral-900 dark:text-white line-clamp-2">
        {{ label || data.title || 'Untitled Decision' }}
      </p>

      <!-- Description preview -->
      <p
        v-if="data.description"
        class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1"
      >
        {{ (data.description as string).replace(/<[^>]*>/g, '').substring(0, 80) }}
      </p>
    </div>

    <!-- Output handle -->
    <Handle
      type="source"
      :position="Position.Bottom"
      class="!bg-neutral-400 dark:!bg-neutral-600 !w-3 !h-3 !border-2 !border-white dark:!border-neutral-900"
    />
  </div>
</template>

<style scoped>
.decision-node {
  @apply bg-white dark:bg-neutral-800;
  @apply border border-neutral-200 dark:border-neutral-700;
  @apply rounded-lg shadow-sm;
  @apply min-w-[200px] max-w-[280px];
  @apply transition-all duration-150;
}

.decision-node:hover {
  @apply shadow-md border-neutral-300 dark:border-neutral-600;
}

.node-content {
  @apply p-3;
}
</style>
