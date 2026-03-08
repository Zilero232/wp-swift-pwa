<script setup lang="ts">
import { useMediaLibrary } from "../model/useMediaLibrary";

import MediaFileUpload from "./MediaFileUpload.vue";

import type { MediaAttachment } from "@/shared/types/media";
import EmptyState from "@/shared/ui/EmptyState.vue";
import InputField from "@/shared/ui/InputField.vue";
import ModalDialog from "@/shared/ui/ModalDialog.vue";

interface Props {
  visible: boolean;
}

interface Emits {
  (e: "update:visible", value: boolean): void;
  (e: "select", data: MediaAttachment): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { isLoading, searchQuery, libraryItems, addUploadedToLibrary, showSuccessMessage } =
  useMediaLibrary({
    visible: () => props.visible,
  });

const handleUpload = (data: MediaAttachment) => {
  addUploadedToLibrary(data);
};

const handleSelectAttachment = (item: MediaAttachment) => {
  emit("select", item);
  emit("update:visible", false);

  showSuccessMessage();
};
</script>

<template>
  <ModalDialog
    :visible="visible"
    header="Select image from library"
    @update:visible="emit('update:visible', $event)"
  >
    <template #content>
      <div class="tw:flex tw:flex-col tw:gap-4">
        <InputField
          v-model="searchQuery"
          label="Search images"
          icon="pi pi-search"
          placeholder="Search images by name or URL"
        />

        <div v-if="isLoading" class="tw:flex tw:justify-center tw:items-center tw:py-8">
          <i class="pi pi-spin pi-spinner tw:text-2xl tw:text-gray-400"></i>
        </div>

        <EmptyState
          v-else-if="libraryItems.length === 0"
          icon="pi pi-images"
          title="Images not found"
          description="Try changing the search query or upload a new image"
        />

        <div
          v-else
          class="tw:grid tw:grid-cols-4 tw:md:grid-cols-6 tw:lg:grid-cols-8 tw:gap-2 tw:max-h-96 tw:overflow-y-auto tw:p-1"
        >
          <div
            v-for="item in libraryItems"
            :key="item.id"
            class="tw:cursor-pointer tw:border-2 tw:rounded-lg tw:overflow-hidden tw:transition-all tw:hover:border-blue-500 tw:hover:shadow-md tw:bg-white"
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
          <div class="tw:text-sm tw:text-gray-600 tw:mb-2">Or upload a new image:</div>

          <MediaFileUpload choose-label="Upload new image" @uploaded="handleUpload" />
        </div>
      </div>
    </template>
  </ModalDialog>
</template>
