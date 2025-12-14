<template>
  <CroutonFormActionButton
    v-if="action === 'delete'"
    :action="action"
    :collection="collection"
    :items="items"
    :loading="loading"
    @click="handleSubmit"
  />

  <UForm
    v-else
    :schema="schema"
    :state="state"
    @submit="handleSubmit"
  >
    <CroutonFormLayout>
      <template #main>
      <div class="flex flex-col gap-4 p-1">
        <UFormField label="Title" name="title" class="not-last:pb-4">
          <UInput v-model="state.title" class="w-full" size="xl" />
        </UFormField>
        <UFormField label="Description" name="description" class="not-last:pb-4">
          <CroutonEditorSimple v-model="state.description" />
        </UFormField>
      </div>
      </template>

      <template #sidebar>
      <div class="flex flex-col gap-4 p-1">
        <UFormField label="Status" name="status" class="not-last:pb-4">
          <UInput v-model="state.status" class="w-full" size="xl" />
        </UFormField>
        <UFormField label="DueDate" name="dueDate" class="not-last:pb-4">
          <CroutonCalendar v-model:date="state.dueDate" />
        </UFormField>
        <UFormField label="Priority" name="priority" class="not-last:pb-4">
          <UInput v-model="state.priority" class="w-full" size="xl" />
        </UFormField>
        <UFormField label="Outcome" name="outcome" class="not-last:pb-4">
          <UInput v-model="state.outcome" class="w-full" size="xl" />
        </UFormField>
      </div>
      </template>

      <template #footer>
        <CroutonFormActionButton
          :action="action"
          :collection="collection"
          :items="items"
          :loading="loading"
        />
      </template>
    </CroutonFormLayout>
  </UForm>
</template>

<script setup lang="ts">
import type { ThinkgraphDecisionFormProps, ThinkgraphDecisionFormData } from '../../types'
import useThinkgraphDecisions from '../composables/useThinkgraphDecisions'

const props = defineProps<ThinkgraphDecisionFormProps>()
const { defaultValue, schema, collection } = useThinkgraphDecisions()

// Form layout configuration
const tabs = ref(false)



// Use new mutation composable for data operations
const { create, update, deleteItems } = useCollectionMutation(collection)

// useCrouton still manages modal state
const { close } = useCrouton()

// Initialize form state with proper values (no watch needed!)
// Hierarchy defaults for new items (parentId, path, depth, order)
const hierarchyDefaults = {
  parentId: null,
  path: '/',
  depth: 0,
  order: 0
}
const initialValues = props.action === 'update' && props.activeItem?.id
  ? { ...defaultValue, ...props.activeItem }
  : { ...defaultValue, ...hierarchyDefaults }

// Convert date strings to Date objects for date fields during editing
if (props.action === 'update' && props.activeItem?.id) {
  if (initialValues.dueDate) {
    initialValues.dueDate = new Date(initialValues.dueDate)
  }
}

const state = ref<ThinkgraphDecisionFormData & { id?: string | null }>(initialValues)

const handleSubmit = async () => {
  try {
    // Serialize Date objects to ISO strings for API submission
    const serializedData = { ...state.value }
    if (serializedData.dueDate instanceof Date) {
      serializedData.dueDate = serializedData.dueDate.toISOString()
    }

    if (props.action === 'create') {
      await create(serializedData)
    } else if (props.action === 'update' && state.value.id) {
      await update(state.value.id, serializedData)
    } else if (props.action === 'delete') {
      await deleteItems(props.items)
    }

    close()

  } catch (error) {
    console.error('Form submission failed:', error)
    // You can add toast notification here if available
    // toast.add({ title: 'Error', description: 'Failed to submit form', color: 'red' })
  }
}
</script>