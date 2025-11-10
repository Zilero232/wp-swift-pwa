import './assets/main.css';

import {
 createApp 
} from 'vue';
import {
 createPinia 
} from 'pinia';
import {
 ToastService, ConfirmationService, Tooltip 
} from 'primevue';
import {
 VueQueryPlugin 
} from '@tanstack/vue-query';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Register services
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
        staleTime: 1000 * 60 * 60, // 60 minutes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnWindowFocus: true,
        retry: 1,
      },
    },
  },
});
app.use(router);

// Register tooltip directive
app.directive('tooltip', Tooltip);

// Mount app
app.mount('#swift-pwa-settings-app');
