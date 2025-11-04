<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Select, Button, type SelectFilterEvent } from 'primevue';

import { useDebounce } from '@/shared/composable/useDebounce';

import { usePosts } from '../model/usePosts';

interface Props {
  label?: string;
  icon?: string;
  required?: boolean;
  placeholder?: string;
  modelValue?: string;
}

defineProps<Props>();

const searchQuery = ref('');

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { isLoading, hasMore, postOptions, loadPosts, loadMore } = usePosts(searchQuery);

// Debounced search handler
const { debouncedFn: debouncedHandleFilter } = useDebounce((event: SelectFilterEvent) => {
  searchQuery.value = event.value;
}, 300);

onMounted(() => {
  loadPosts();
});
</script>

<template>
  <div class="tw:w-full">
    <label v-if="label" class="tw:block tw:text-xs tw:font-semibold tw:text-gray-600 tw:mb-1.5 tw:uppercase tw:tracking-wide">
      <i v-if="icon" :class="['tw:text-xs tw:mr-1', icon]"></i>

      {{ label }}

      <span v-if="required" class="tw:text-red-500 tw:ml-0.5">*</span>
    </label>

    <Select
      :model-value="modelValue"
      :options="postOptions"
      :placeholder="placeholder"
      :loading="isLoading"
      option-label="label"
      option-value="value"
      :filter="true"
      class="tw:w-full"
      @update:model-value="emit('update:modelValue', $event)"
      @filter="debouncedHandleFilter"
    >
      <template #footer>
        <div v-if="hasMore" class="tw:p-2 tw:border-t">
          <Button label="Загрузить ещё" icon="pi pi-arrow-down" size="small" text :loading="isLoading" class="tw:w-full" @click="loadMore" />
        </div>
      </template>
    </Select>
  </div>
</template>
