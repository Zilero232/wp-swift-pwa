<script setup lang="ts">
import { ref, watch } from 'vue';
import { Dialog, Button, Tag } from 'primevue';

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
  <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" :header="title" modal :style="{ width: '90vw', maxWidth: '900px' }">
    <div v-if="!imageLoaded && !imageError" class="flex justify-center items-center p-12">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
    </div>

    <div v-show="imageLoaded && !imageError" class="flex flex-col gap-4">
      <div v-if="image.sizes || image.type" class="flex justify-between gap-2">
        <Tag v-if="image.sizes" :value="image.sizes" severity="secondary" />

        <Tag v-if="image.type" :value="image.type" severity="secondary" />
      </div>

      <img
        :src="image.src"
        :alt="image.label"
        class="max-w-full max-h-[70vh] object-contain"
        :class="{ hidden: !imageLoaded || imageError }"
        @error="handleImageError"
        @load="handleImageLoad"
      />

      <div v-if="image.label" class="text-xs text-gray-500 text-center truncate">
        {{ image.label }}
      </div>
    </div>

    <div v-if="imageError" class="flex flex-col items-center justify-center p-12 text-center">
      <i class="pi pi-exclamation-triangle text-6xl text-red-400 mb-4"></i>

      <p class="text-lg text-gray-600">Не удалось загрузить изображение</p>
    </div>

    <template #footer>
      <Button label="Закрыть" @click="emit('update:visible', false)" />
    </template>
  </Dialog>
</template>
