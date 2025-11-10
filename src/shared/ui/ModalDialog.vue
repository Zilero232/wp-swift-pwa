<script setup lang="ts">
import {
 Dialog, Button 
} from 'primevue';

interface Props {
  visible: boolean;
  header?: string;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const handleClose = () => {
  emit('update:visible', false);
};
</script>

<template>
  <Dialog
    modal
    :visible="visible"
    :header="header"
    :style="{ width: '90vw', maxWidth: '800px' }"
    @update:visible="emit('update:visible', $event)"
  >
    <slot name="content" />

    <template #footer>
      <Button label="Закрыть" text @click="handleClose" />
    </template>
  </Dialog>
</template>
