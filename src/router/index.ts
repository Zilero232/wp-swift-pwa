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
          name: 'welcome',
          component: () => import('@/views/WelcomeView.vue'),
        },
        {
          path: '/manifest',
          name: 'manifest',
          component: () => import('@/views/ManifestView.vue'),
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
