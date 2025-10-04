import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { v4wp } from '@kucrut/vite-for-wp';

// https://vite.dev/config/
export default defineConfig({
  plugins: [v4wp({ input: 'src/main.ts', outDir: 'build' }), vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
