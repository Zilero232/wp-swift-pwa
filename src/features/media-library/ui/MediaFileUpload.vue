<script setup lang="ts">
import {
 ref 
} from 'vue';
import {
 FileUpload, type FileUploadMethods, type FileUploadSelectEvent 
} from 'primevue';

import type {
 MediaAttachment 
} from '@/shared/types/media';

import {
 useMediaUpload 
} from '../model/useMediaUpload';

interface Props {
  accept?: string;
  chooseLabel?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'uploaded', data: MediaAttachment): void;
}

withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  chooseLabel: 'Загрузить',
  disabled: false,
});

const emit = defineEmits<Emits>();

const fileUploader = ref<FileUploadMethods>();

const {
 uploadFile, isUploading 
} = useMediaUpload();

const handleSelect = (event: FileUploadSelectEvent) => {
  const files = event.files;
  if (!files || files.length === 0) return;

  const file = files[0];
  if (file) {
    uploadFile(file, {
      onSuccess: (data) => {
        emit('uploaded', data);
      },
    });
  }
};
</script>

<template>
  <FileUpload
    ref="fileUploader"
    mode="basic"
    :accept="accept"
    :custom-upload="true"
    :choose-label="chooseLabel"
    :auto-upload="false"
    :disabled="disabled || isUploading"
    @select="handleSelect"
  />
</template>
