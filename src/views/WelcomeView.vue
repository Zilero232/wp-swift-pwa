<script setup lang="ts">
import {
 Button, Card 
} from 'primevue';
import {
 useRouter 
} from 'vue-router';

const router = useRouter();

const features = [
  {
    icon: 'pi pi-mobile',
    title: 'PWA приложение',
    description: 'Превратите сайт в приложение с установкой на устройство',
  },
  {
    icon: 'pi pi-cog',
    title: 'Простая настройка',
    description: 'Визуальный редактор манифеста без кода',
  },
  {
    icon: 'pi pi-wifi-off',
    title: 'Офлайн режим',
    description: 'Работа без интернета через Service Worker',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Быстрая работа',
    description: 'Оптимизация и кэширование для скорости',
  },
];

const goTo = (route: string) => router.push(route);
</script>

<template>
  <div
    class="tw:flex-1 tw:bg-gradient-to-br tw:from-blue-50 tw:via-white tw:to-purple-50 tw:flex tw:items-center tw:justify-center tw:p-6"
  >
    <div class="tw:max-w-6xl tw:w-full tw:space-y-16 tw:py-12">
      <div class="tw:text-center tw:space-y-6 tw:flex tw:flex-col tw:items-center">
        <div
          class="tw:inline-flex tw:items-center tw:justify-center tw:w-20 tw:h-20 tw:bg-gradient-to-br tw:from-blue-600 tw:to-purple-600 tw:rounded-3xl tw:shadow-2xl tw:mb-4"
        >
          <i class="pi pi-bolt tw:text-4xl tw:text-white"></i>
        </div>

        <h1
          class="tw:text-5xl tw:md:text-6xl tw:lg:text-7xl tw:font-black tw:text-gray-900 tw:tracking-tight"
        >
          Swift PWA
        </h1>

        <p class="tw:text-xl tw:md:text-2xl tw:text-gray-600 tw:max-w-2xl">
          Создайте Progressive Web App для WordPress.
        </p>

        <div class="tw:flex tw:flex-wrap tw:gap-4 tw:justify-center tw:pt-4">
          <Button
            label="Настроить манифест"
            icon="pi pi-arrow-right"
            icon-pos="right"
            size="large"
            class="tw:px-8 tw:py-3 tw:font-bold tw:shadow-xl hover:tw:shadow-2xl tw:transition-all hover:tw:scale-105"
            @click="goTo('/manifest')"
          />
          <Button
            label="Превью"
            icon="pi pi-eye"
            size="large"
            outlined
            severity="secondary"
            class="tw:px-8 tw:py-3 tw:font-bold tw:transition-all hover:tw:scale-105"
            @click="goTo('/preview')"
          />
        </div>
      </div>

      <div class="tw:grid sm:tw:grid-cols-2 tw:lg:grid-cols-4 tw:gap-6">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="tw:text-center tw:border-2 tw:border-gray-100 hover:tw:border-blue-200 hover:tw:shadow-xl hover:tw:-translate-y-2 tw:transition-all tw:duration-300"
        >
          <template #content>
            <div class="tw:space-y-4">
              <div
                class="tw:inline-flex tw:items-center tw:justify-center tw:w-16 tw:h-16 tw:bg-gradient-to-br tw:from-blue-500 tw:to-purple-600 tw:rounded-2xl tw:shadow-lg"
              >
                <i :class="[feature.icon, 'tw:text-3xl tw:text-white']"></i>
              </div>
              <h3 class="tw:text-lg tw:font-bold tw:text-gray-900">
                {{ feature.title }}
              </h3>
              <p class="tw:text-sm tw:text-gray-600">{{ feature.description }}</p>
            </div>
          </template>
        </Card>
      </div>

      <div class="tw:text-center tw:space-y-4 tw:pt-8">
        <div
          class="tw:flex tw:flex-wrap tw:gap-8 tw:justify-center tw:text-sm tw:text-gray-600"
        >
          <div>
            <div class="tw:text-3xl tw:font-black tw:text-gray-900 tw:mb-1">5 мин</div>
            <div>Настройка</div>
          </div>
          <div>
            <div class="tw:text-3xl tw:font-black tw:text-gray-900 tw:mb-1">
              Бесплатно
            </div>
            <div>Навсегда</div>
          </div>
          <div>
            <div class="tw:text-3xl tw:font-black tw:text-gray-900 tw:mb-1">
              WordPress
            </div>
            <div>Интеграция</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
