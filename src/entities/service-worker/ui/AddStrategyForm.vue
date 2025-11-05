<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import InputField from '@/shared/ui/InputField.vue';

interface Props {
  onAdd: (extensions: string) => void;
}

const props = defineProps<Props>();

const newExtensionsInput = ref('');

const handleAdd = () => {
  if (!newExtensionsInput.value.trim()) return;

  props.onAdd(newExtensionsInput.value);
  newExtensionsInput.value = '';
};
</script>

<template>
  <div class="tw:bg-gray-50 tw:border tw:border-gray-200 tw:rounded-lg tw:p-4">
    <h3 class="tw:text-sm tw:font-semibold tw:text-gray-700 tw:mb-3">
      Добавить пользовательские расширения:
    </h3>
    <div class="tw:flex tw:gap-2">
      <InputField
        v-model="newExtensionsInput"
        label="Расширения (через запятую)"
        placeholder="например: mp4,webm,mp3"
        class="tw:flex-1"
        @keyup.enter="handleAdd"
      />
      <Button label="Добавить" icon="pi pi-plus" class="tw:mt-6" @click="handleAdd" />
    </div>
    <p class="tw:text-xs tw:text-gray-500 tw:mt-2">
      Введите расширения через запятую без точек (например: mp4,webm,mp3)
    </p>
  </div>
</template>
