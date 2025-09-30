import { createRouter, createWebHashHistory } from 'vue-router';

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
          name: 'manifest',
          component: () => import('@/views/ManifestView.vue'),
        },
        {
          path: '/service-worker',
          name: 'service-worker',
          component: () => import('@/views/ServiceWorkerView.vue'),
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/NotificationsView.vue'),
        },
        {
          path: '/preview',
          name: 'preview',
          component: () => import('@/views/PreviewView.vue'),
        },
      ],
    },
  ],
});

export default router;
