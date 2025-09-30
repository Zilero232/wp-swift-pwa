<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FormField from '@/shared/ui/FormField.vue'
import type { ManifestSettings } from '@/shared/types/manifest'

interface Props {
  manifest: ManifestSettings
  errors?: string[]
}

interface Emits {
  (e: 'update:field', field: keyof ManifestSettings, value: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const updateField = (field: keyof ManifestSettings, value: unknown) => {
  emit('update:field', field, value)
}

const getFieldError = (field: string): string | undefined => {
  if (!props.errors) return undefined

  return props.errors.find(
    (error) =>
      error.toLowerCase().includes(field.toLowerCase()) ||
      (field === 'name' && error.includes('название')) ||
      (field === 'short_name' && error.includes('короткое')),
  )
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <FormField
      label="Название приложения"
      help="Полное название вашего PWA приложения"
      :error="getFieldError('name')"
      required
    >
      <InputText
        :model-value="manifest.name"
        @update:model-value="updateField('name', $event)"
        placeholder="Введите название приложения"
        class="w-full"
      />
    </FormField>

    <FormField
      label="Короткое название"
      help="Используется когда недостаточно места для полного названия"
      :error="getFieldError('short_name')"
      required
    >
      <InputText
        :model-value="manifest.short_name"
        @update:model-value="updateField('short_name', $event)"
        placeholder="Короткое название"
        class="w-full"
      />
    </FormField>

    <FormField label="Описание" help="Краткое описание приложения">
      <Textarea
        :model-value="manifest.description"
        @update:model-value="updateField('description', $event)"
        placeholder="Описание приложения"
        rows="3"
        class="w-full"
      />
    </FormField>
  </div>
</template>
