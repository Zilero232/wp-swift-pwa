<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { Dialog, Button } from 'primevue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { mediaAPI, type MediaLibraryResponse } from '@/services/media.service';
import { useToast } from '@/shared/composable/useToast';
import { useDebounce } from '@/shared/composable/useDebounce';

import MediaFileUpload from '@/shared/ui/MediaFileUpload.vue';
import InputField from '@/shared/ui/InputField.vue';
import EmptyState from '@/shared/ui/EmptyState.vue';

import type { MediaAttachment } from '@/shared/types/media';

interface Props {
  visible: boolean;
  selectedUrl?: string;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'select', data: MediaAttachment): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { showSuccess } = useToast();
const queryClient = useQueryClient();

const searchQuery = ref('');
const debouncedSearchValue = ref('');

// Debounced search
const { debouncedFn: debouncedSearch } = useDebounce((value: string) => {
  debouncedSearchValue.value = value;
}, 500);

const queryKey = computed(() => {
  return [
    `media-library${debouncedSearchValue.value ? `-${debouncedSearchValue.value}` : ''}`,
  ];
});

// Load media library with search
const {
  data: libraryData,
  isLoading: isLoadingLibrary,
  refetch: loadLibrary,
} = useQuery({
  queryKey: queryKey.value,
  queryFn: async () => {
    return await mediaAPI.getLibrary({
      search: searchQuery.value,
      per_page: 24,
    });
  },
  enabled: props.visible,
});

const libraryItems = computed(() => libraryData.value?.items ?? []);

const handleUpload = (data: MediaAttachment) => {
  queryClient.setQueryData(queryKey.value, (oldData: MediaLibraryResponse) => {
    return {
      ...oldData,
      items: [data, ...oldData.items],
    };
  });
};

const handleSelectAttachment = (item: MediaAttachment) => {
  emit('select', item);
  emit('update:visible', false);

  showSuccess('Изображение выбрано');
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      loadLibrary();
    } else {
      searchQuery.value = '';
    }
  },
);

watch(searchQuery, (newValue) => {
  if (props.visible) {
    debouncedSearch(newValue);
  }
});
</script>

<template>
  <Dialog
    :visible="visible"
    header="Выберите изображение из библиотеки"
    modal
    :style="{ width: '90vw', maxWidth: '800px' }"
    @update:visible="emit('update:visible', $event)"
  >
    <div class="tw:flex tw:flex-col tw:gap-4">
      <InputField
        v-model="searchQuery"
        label="Поиск изображений"
        icon="pi pi-search"
        placeholder="Найти изображение по названию или URL"
      />

      <div
        v-if="isLoadingLibrary"
        class="tw:flex tw:justify-center tw:items-center tw:py-8"
      >
        <i class="pi pi-spin pi-spinner tw:text-2xl tw:text-gray-400"></i>
      </div>

      <EmptyState
        v-else-if="libraryItems.length === 0"
        icon="pi pi-images"
        title="Изображения не найдены"
        description="Попробуйте изменить поисковый запрос или загрузите новое изображение"
      />

      <div
        v-else
        class="tw:grid tw:grid-cols-4 tw:md:grid-cols-6 tw:lg:grid-cols-8 tw:gap-2 tw:max-h-96 tw:overflow-y-auto tw:p-1"
      >
        <div
          v-for="item in libraryItems"
          :key="item.id"
          class="tw:cursor-pointer tw:border-2 tw:rounded-lg tw:overflow-hidden tw:transition-all tw:hover:border-blue-500 tw:hover:shadow-md tw:bg-white"
          :class="{
            'tw:border-blue-500 tw:shadow-md': selectedUrl === item.url,
            'tw:border-gray-200': selectedUrl !== item.url,
          }"
          @click="handleSelectAttachment(item)"
        >
          <div class="relative aspect-square tw:bg-gray-100">
            <img
              :src="item.url"
              :alt="item.alt || item.title"
              class="tw:w-full tw:h-full tw:object-cover"
            />
          </div>

          <div class="tw:p-2 tw:text-xs tw:truncate tw:text-gray-700" :title="item.title">
            {{ item.title }}
          </div>
        </div>
      </div>

      <div class="tw:border-t tw:pt-4">
        <div class="tw:text-sm tw:text-gray-600 tw:mb-2">
          Или загрузите новое изображение:
        </div>

        <MediaFileUpload
          choose-label="Загрузить новое изображение"
          @uploaded="handleUpload"
        />
      </div>
    </div>

    <template #footer>
      <Button label="Закрыть" text @click="emit('update:visible', false)" />
    </template>
  </Dialog>
</template>
