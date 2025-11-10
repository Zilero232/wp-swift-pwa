<script setup lang="ts">
import {
 ref, watch 
} from 'vue';
import {
 codeToHtml 
} from 'shiki';

interface Props {
  manifestJson: string;
}

const props = defineProps<Props>();

const highlightedCode = ref('');

const highlight = async (code: string) => {
  if (!code) {
    return (highlightedCode.value = '');
  }

  highlightedCode.value = await codeToHtml(code, {
    lang: 'json',
    theme: 'one-dark-pro',
  });
};

watch(() => props.manifestJson, highlight, {
  immediate: true,
});
</script>

<template>
  <div class="tw:flex tw:flex-col">
    <div v-if="manifestJson" class="tw:bg-gray-900 tw:rounded-lg tw:overflow-hidden">
      <div v-html="highlightedCode" class="shiki-wrapper"></div>
    </div>

    <div v-else class="tw:p-8 tw:text-center tw:text-gray-500">
      <i class="pi pi-inbox tw:text-4xl tw:mb-4 tw:block tw:text-gray-400"></i>
      <p class="tw:text-lg">Манифест пуст. Заполните настройки PWA.</p>
    </div>
  </div>
</template>

<style scoped>
.shiki-wrapper :deep(pre) {
  margin: 0;
  padding: 1rem;
  overflow: auto;
  max-height: 600px;
}

.shiki-wrapper :deep(code) {
  font-size: 0.875rem;
  line-height: 1.7;
}
</style>
