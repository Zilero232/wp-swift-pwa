<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import { ProgressSpinner } from 'primevue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import Header from '@/widgets/header/Header.vue';
import Footer from '@/widgets/footer/Footer.vue';

const route = useRoute();

const { queryManifest } = useManifestQuery();

// Hide header on welcome page
const isShow = computed(() => route.name !== 'welcome');

onMounted(() => {
  queryManifest.refetch();
});
</script>

<template>
  <Header v-if="isShow" />

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

  <Footer v-if="isShow" />
</template>
