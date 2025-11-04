import { createRouter, createWebHashHistory } from 'vue-router';

import { RouteName } from '@/shared/config/routes.constants';

const router = createRouter({
  // Use hash history for WordPress admin context to avoid conflicts
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: RouteName.WELCOME,
          component: () => import('@/views/WelcomeView.vue'),
        },
        {
          path: '/manifest',
          name: RouteName.MANIFEST,
          component: () => import('@/views/ManifestView.vue'),
        },
        {
          path: '/preview',
          name: RouteName.PREVIEW,
          component: () => import('@/views/PreviewView.vue'),
        },
        {
          path: '/status',
          name: RouteName.STATUS,
          component: () => import('@/views/StatusView.vue'),
        },
      ],
    },
  ],
});

export default router;
