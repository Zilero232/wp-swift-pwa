<script setup lang="ts">
import { onMounted, ref } from 'vue';

import ProgressSpinner from 'primevue/progressspinner';

import { useManifestStore } from '@/entities/manifest/model/store';

import Header from '@/widgets/header/ui/Header.vue';
import Footer from '@/widgets/footer/ui/Footer.vue';

const saving = ref(false);

const manifestStore = useManifestStore();

const handleReset = () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
    manifestStore.resetManifest();
  }
};

onMounted(async () => {
  await manifestStore.loadManifest();
});
</script>

<template>
  <Header @reset="handleReset" :saving="saving" />

  <main>
    <Suspense>
      <template #default>
        <RouterView />
      </template>

      <template #fallback>
        <ProgressSpinner />
      </template>
    </Suspense>
  </main>

  <Footer />
</template>
