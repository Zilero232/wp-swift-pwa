<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import { ProgressSpinner } from 'primevue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import Header from '@/widgets/header/Header.vue';
import Footer from '@/widgets/footer/Footer.vue';

import { RouteName } from '@/shared/config/routes.constants';

const route = useRoute();

const isWelcomePage = computed(() => route.name === RouteName.WELCOME);
const { queryManifest } = useManifestQuery({ enabled: !isWelcomePage });

const isLoading = computed(() => queryManifest.isPending.value);
</script>

<template>
  <Header v-if="!isWelcomePage" />

  <main class='tw:flex-1'>
    <div v-if="isLoading && !isWelcomePage" class="tw:absolute tw:top-[50%] tw:left-[50%] tw:translate-[-50%]">
      <ProgressSpinner />
    </div>

    <Suspense v-else>
      <template #default>
        <RouterView />
      </template>

      <template #fallback>
        <ProgressSpinner />
      </template>
    </Suspense>
  </main>

  <Footer v-if="!isWelcomePage" />
</template>
