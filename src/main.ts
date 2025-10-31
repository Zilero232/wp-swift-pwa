import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { ToastService, ConfirmationService } from 'primevue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'swift-pwa',
      darkModeSelector: false,
    },
  },
});
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (was cacheTime)
        refetchOnWindowFocus: true,
        retry: 1,
      },
    },
  },
});
app.use(router);

app.mount('#swift-pwa-settings-app');
