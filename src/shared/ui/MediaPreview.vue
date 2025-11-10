<script setup lang="ts">
import {
 ref, watch 
} from 'vue';
import {
 Tag 
} from 'primevue';

import ModalDialog from '@/shared/ui/ModalDialog.vue';

interface Image {
  src: string;
  sizes: string;
  type: string;
  label: string;
}

interface Props {
  title?: string;
  visible: boolean;
  image: Partial<Image>;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Предпросмотр изображения',
});

const emit = defineEmits<Emits>();

const imageError = ref(false);
const imageLoaded = ref(false);

const handleImageError = () => {
  imageError.value = true;
};

const handleImageLoad = () => {
  imageLoaded.value = true;
};

watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      imageError.value = false;
      imageLoaded.value = false;
    }
  },
);
</script>

<template>
  <ModalDialog
    :visible="visible"
    :header="title"
    @update:visible="emit('update:visible', $event)"
  >
    <template #content>
      <div
        v-if="!imageLoaded && !imageError"
        class="tw:flex tw:justify-center tw:items-center tw:p-12"
      >
        <i class="pi pi-spin pi-spinner tw:text-4xl tw:text-gray-400"></i>
      </div>

      <div v-show="imageLoaded && !imageError" class="tw:flex tw:flex-col tw:gap-4">
        <div v-if="image.sizes || image.type" class="tw:flex tw:justify-between tw:gap-2">
          <Tag v-if="image.sizes" :value="image.sizes" severity="secondary" />

          <Tag v-if="image.type" :value="image.type" severity="secondary" />
        </div>

        <img
          :src="image.src"
          :alt="image.label"
          class="tw:max-tw:w-full tw:max-h-[70vh] tw:object-contain"
          :class="{ hidden: !imageLoaded || imageError }"
          @error="handleImageError"
          @load="handleImageLoad"
        />

        <div
          v-if="image.label"
          class="tw:text-xs tw:text-gray-500 tw:text-center tw:truncate"
        >
          {{ image.label }}
        </div>
      </div>

      <div
        v-if="imageError"
        class="tw:flex tw:flex-col tw:items-center tw:justify-center tw:p-12 tw:text-center"
      >
        <i class="pi pi-exclamation-triangle tw:text-6xl tw:text-red-400 tw:mb-4"></i>

        <p class="tw:text-lg tw:text-center tw:text-gray-600">
          Не удалось загрузить изображение
        </p>
      </div>
    </template>
  </ModalDialog>
</template>
