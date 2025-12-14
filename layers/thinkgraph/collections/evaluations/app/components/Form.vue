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
        <UFormField label="OptionId" name="optionId" class="not-last:pb-4">
          <UInput v-model="state.optionId" class="w-full" size="xl" />
        </UFormField>
        <UFormField label="CriteriaId" name="criteriaId" class="not-last:pb-4">
          <UInput v-model="state.criteriaId" class="w-full" size="xl" />
        </UFormField>
        <UFormField label="Score" name="score" class="not-last:pb-4">
          <UInputNumber v-model="state.score" class="w-full" />
        </UFormField>
        <UFormField label="Notes" name="notes" class="not-last:pb-4">
          <UTextarea v-model="state.notes" class="w-full" size="xl" />
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
import type { ThinkgraphEvaluationFormProps, ThinkgraphEvaluationFormData } from '../../types'
import useThinkgraphEvaluations from '../composables/useThinkgraphEvaluations'

const props = defineProps<ThinkgraphEvaluationFormProps>()
const { defaultValue, schema, collection } = useThinkgraphEvaluations()

// Form layout configuration
const tabs = ref(false)



// Use new mutation composable for data operations
const { create, update, deleteItems } = useCollectionMutation(collection)

// useCrouton still manages modal state
const { close, loading } = useCrouton()

// Initialize form state with proper values (no watch needed!)
const initialValues = props.action === 'update' && props.activeItem?.id
  ? { ...defaultValue, ...props.activeItem }
  : { ...defaultValue }

const state = ref<ThinkgraphEvaluationFormData & { id?: string | null }>(initialValues)

const handleSubmit = async () => {
  try {
    if (props.action === 'create') {
      await create(state.value)
    } else if (props.action === 'update' && state.value.id) {
      await update(state.value.id, state.value)
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