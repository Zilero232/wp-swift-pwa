<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { ProgressSpinner } from 'primevue';

import Header from '@/widgets/header/Header.vue';
import Footer from '@/widgets/footer/Footer.vue';

import { RouteName } from '@/shared/config/routes.constants';

const route = useRoute();

const isWelcomePage = computed(() => route.name === RouteName.WELCOME);
</script>

<template>
  <Header v-if="!isWelcomePage" />

  <main class="tw:flex-1 tw:flex tw:flex-col">
    <Suspense>
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
