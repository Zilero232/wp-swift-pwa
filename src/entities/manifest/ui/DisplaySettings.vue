<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import FormField from '@/shared/ui/FormField.vue'
import ColorInput from '@/shared/ui/ColorInput.vue'
import { DISPLAY_OPTIONS, ORIENTATION_OPTIONS } from '@/shared/config/constants'
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
  return props.errors?.find((error) => error.toLowerCase().includes(field.replace('_', ' ')))
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField label="Режим отображения">
        <Dropdown
          :model-value="manifest.display"
          @update:model-value="updateField('display', $event)"
          :options="DISPLAY_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>

      <FormField label="Ориентация">
        <Dropdown
          :model-value="manifest.orientation"
          @update:model-value="updateField('orientation', $event)"
          :options="ORIENTATION_OPTIONS"
          option-label="label"
          option-value="value"
          class="w-full"
        />
      </FormField>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <FormField
        label="Цвет темы"
        help="Цвет строки состояния и заголовка"
        :error="getFieldError('theme_color')"
      >
        <ColorInput
          :model-value="manifest.theme_color"
          @update:model-value="updateField('theme_color', $event)"
          placeholder="#000000"
        />
      </FormField>

      <FormField
        label="Цвет фона"
        help="Цвет экрана загрузки"
        :error="getFieldError('background_color')"
      >
        <ColorInput
          :model-value="manifest.background_color"
          @update:model-value="updateField('background_color', $event)"
          placeholder="#ffffff"
        />
      </FormField>
    </div>
  </div>
</template>
