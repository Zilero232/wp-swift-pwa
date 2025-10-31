<script setup lang="ts">
import { ref } from 'vue';
import { FileUpload, type FileUploadMethods, type FileUploadSelectEvent } from 'primevue';
import { useMutation } from '@tanstack/vue-query';

import { mediaAPI } from '@/services/media.service';

import { useToast } from '@/shared/composable/useToast';

import type { MediaAttachment } from '@/shared/types/media';

interface Props {
  accept?: string;
  chooseLabel?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'uploaded', data: MediaAttachment): void;
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  chooseLabel: 'Загрузить',
  disabled: false,
});

const emit = defineEmits<Emits>();

const { showSuccess, showError } = useToast();
const fileUploader = ref<FileUploadMethods>();

const { mutate: uploadFile, isPending: isUploading } = useMutation({
  mutationFn: async (file: File) => {
    return await mediaAPI.uploadFile(file);
  },
  onSuccess: (data) => {
    showSuccess('Изображение загружено');

    emit('uploaded', data);
  },
  onError: () => {
    showError('Не удалось загрузить изображение');
  },
});

const handleSelect = (event: FileUploadSelectEvent) => {
  const files = event.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  if (file) {
    uploadFile(file);
  }
};
</script>

<template>
  <FileUpload
    ref="fileUploader"
    mode="basic"
    :accept="props.accept"
    :custom-upload="true"
    :choose-label="props.chooseLabel"
    :auto-upload="false"
    :disabled="props.disabled || isUploading"
    @select="handleSelect"
  />
</template>
