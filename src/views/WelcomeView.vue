<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const router = useRouter();

const features = [
  {
    icon: 'pi pi-mobile',
    title: 'Progressive Web App',
    description: 'Превратите ваш WordPress сайт в современное PWA приложение',
    gradient: 'tw:from-blue-500 tw:to-cyan-500',
  },
  {
    icon: 'pi pi-cog',
    title: 'Простая настройка',
    description: 'Интуитивный интерфейс для создания и настройки манифеста',
    gradient: 'tw:from-purple-500 tw:to-pink-500',
  },
  {
    icon: 'pi pi-download',
    title: 'Установка на устройство',
    description: 'Пользователи смогут установить ваш сайт как приложение',
    gradient: 'tw:from-green-500 tw:to-emerald-500',
  },
  {
    icon: 'pi pi-sync',
    title: 'Офлайн режим',
    description: 'Работа сайта даже без интернет-соединения',
    gradient: 'tw:from-orange-500 tw:to-red-500',
  },
];

const goTo = (route: string) => {
  router.push(route);
};
</script>

<template>
  <div class="tw:min-h-screen tw:bg-gradient-to-br tw:from-blue-50 tw:via-indigo-50 tw:to-purple-50 tw:relative tw:overflow-hidden">
    <div class="tw:absolute tw:inset-0 tw:overflow-hidden tw:pointer-events-none">
      <div class="tw:absolute tw:-top-40 tw:-right-40 tw:w-80 tw:h-80 tw:bg-purple-300 tw:rounded-full tw:mix-blend-multiply tw:filter tw:blur-xl tw:opacity-30 tw:animate-blob"></div>
      <div
        class="tw:absolute tw:-bottom-40 tw:-left-40 tw:w-80 tw:h-80 tw:bg-blue-300 tw:rounded-full tw:mix-blend-multiply tw:filter tw:blur-xl tw:opacity-30 tw:animate-blob tw:animation-delay-2000"
      ></div>
      <div
        class="tw:absolute tw:top-1/2 tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:-translate-y-1/2 tw:w-80 tw:h-80 tw:bg-pink-300 tw:rounded-full tw:mix-blend-multiply tw:filter tw:blur-xl tw:opacity-30 tw:animate-blob tw:animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10 tw:p-4 sm:tw:p-8 tw:py-12">
      <div class="tw:text-center tw:mb-16 tw:animate-fade-in">
        <div class="tw:mb-8">
          <div
            class="inline-tw:flex tw:items-center tw:justify-center tw:w-32 tw:h-32 bg-gradient-to-br tw:from-blue-500 tw:to-purple-600 tw:rounded-3xl tw:shadow-2xl tw:mb-6 tw:animate-bounce-slow"
          >
            <i class="pi pi-bolt tw:text-6xl tw:text-white"></i>
          </div>
        </div>

        <h1
          class="tw:text-5xl sm:tw:text-6xl lg:tw:text-7xl tw:font-extrabold tw:mb-6 bg-gradient-to-r tw:from-blue-600 tw:via-purple-600 tw:to-pink-600 tw:bg-clip-text tw:text-transparent"
        >
          Добро пожаловать в Swift PWA
        </h1>

        <p class="tw:text-xl sm:tw:text-2xl tw:text-gray-700 tw:mx-auto tw:mb-10 tw:font-medium">
          Создайте <span class="text-blue-600 font-bold">Progressive Web App</span> для вашего WordPress сайта

          <span class="inline-block tw:animate-pulse">⚡</span>
        </p>

        <div class="tw:flex tw:gap-4 tw:justify-center tw:flex-wrap">
          <Button
            label="Настроить манифест"
            icon="pi pi-file-edit"
            severity="primary"
            size="large"
            class="tw:px-8 tw:py-3 tw:shadow-lg tw:hover:shadow-xl tw:transition-all tw:hover:scale-105"
            @click="goTo('/manifest')"
          />

          <Button
            label="Просмотр PWA"
            icon="pi pi-eye"
            severity="secondary"
            size="large"
            outlined
            class="tw:px-8 tw:py-3 tw:hover:scale-105 tw:transition-all"
            @click="goTo('/preview')"
          />
        </div>
      </div>

      <div class="tw:max-w-7xl tw:mx-auto tw:mb-16">
        <h2 class="tw:text-3xl tw:font-bold tw:text-center tw:text-gray-800 tw:mb-10">Возможности вашего PWA</h2>

        <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 lg:tw:grid-cols-4 tw:gap-6">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="tw:group tw:bg-white tw:rounded-2xl tw:p-6 tw:shadow-lg tw:hover:shadow-2xl tw:transition-all tw:duration-300 tw:hover:-translate-y-2 tw:cursor-pointer tw:animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="tw:text-center">
              <div class="tw:mb-5">
                <div
                  :class="[
                    'inline-block tw:flex tw:items-center tw:justify-center tw:w-16 tw:h-16 tw:rounded-2xl bg-gradient-to-br tw:shadow-lg',
                    feature.gradient,
                    'tw:group-hover:scale-110 tw:transition-transform tw:duration-300',
                  ]"
                >
                  <i :class="[feature.icon, 'tw:text-3xl tw:text-white']"></i>
                </div>
              </div>

              <h3 class="tw:text-lg tw:font-bold tw:text-gray-800 tw:mb-2 tw:group-hover:text-blue-600 tw:transition-colors">
                {{ feature.title }}
              </h3>

              <p class="tw:text-sm tw:text-gray-600 tw:leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="tw:max-w-6xl tw:mx-auto">
        <div class="bg-white rounded-3xl tw:shadow-2xl tw:overflow-hidden">
          <div class="tw:bg-gradient-to-r tw:from-blue-600 tw:via-purple-600 tw:to-pink-600 tw:p-1">
            <div class="tw:bg-white tw:rounded-3xl tw:p-8 sm:tw:p-12">
              <div class="tw:text-center tw:mb-10">
                <h2 class="tw:text-3xl sm:tw:text-4xl tw:font-bold tw:text-gray-800 tw:mb-4">🚀 С чего начать?</h2>
                <p class="tw:text-gray-600 tw:text-lg">Следуйте простым шагам для создания вашего PWA</p>
              </div>

              <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-3 gap-8 mb-10">
                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 tw:w-12 tw:h-12 bg-gradient-to-br tw:from-blue-500 tw:to-blue-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center text-white text-xl font-bold shadow-lg"
                  >
                    1
                  </div>

                  <div
                    class="tw:bg-gradient-to-br tw:from-blue-50 tw:to-blue-100 tw:rounded-2xl tw:p-6 tw:pt-8 tw:h-full tw:border-2 tw:border-blue-200 tw:hover:border-blue-400 tw:transition-colors"
                  >
                    <div class="mb-3">
                      <i class="pi pi-file-edit tw:text-3xl tw:text-blue-600"></i>
                    </div>
                    <h4 class="tw:font-bold tw:text-gray-800 tw:mb-2 tw:text-lg">Настройте манифест</h4>
                    <p class="tw:text-sm tw:text-gray-600">Заполните основную информацию: название, иконки, цвета</p>
                  </div>
                </div>

                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br tw:from-purple-500 tw:to-purple-600 rounded-xl tw:flex tw:items-center tw:justify-center text-white text-xl font-bold shadow-lg"
                  >
                    2
                  </div>

                  <div
                    class="tw:bg-gradient-to-br tw:from-purple-50 tw:to-purple-100 tw:rounded-2xl tw:p-6 tw:pt-8 tw:h-full tw:border-2 tw:border-purple-200 tw:hover:border-purple-400 tw:transition-colors"
                  >
                    <div class="tw:mb-3">
                      <i class="pi pi-eye tw:text-3xl tw:text-purple-600"></i>
                    </div>
                    <h4 class="tw:font-bold tw:text-gray-800 mb-2 tw:text-lg">Проверьте результат</h4>
                    <p class="tw:text-sm tw:text-gray-600">Просмотрите манифест и убедитесь, что всё верно</p>
                  </div>
                </div>

                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 tw:w-12 tw:h-12 bg-gradient-to-br tw:from-green-500 tw:to-green-600 tw:rounded-xl tw:flex tw:items-center tw:justify-center text-white text-xl font-bold shadow-lg"
                  >
                    3
                  </div>

                  <div
                    class="tw:bg-gradient-to-br tw:from-green-50 tw:to-green-100 tw:rounded-2xl tw:p-6 tw:pt-8 tw:h-full tw:border-2 tw:border-green-200 tw:hover:border-green-400 tw:transition-colors"
                  >
                    <div class="tw:mb-3">
                      <i class="pi pi-check-circle tw:text-3xl tw:text-green-600"></i>
                    </div>
                    <h4 class="tw:font-bold tw:text-gray-800 mb-2 tw:text-lg">Сохраните настройки</h4>
                    <p class="tw:text-sm tw:text-gray-600">Нажмите "Сохранить" и ваш PWA готов!</p>
                  </div>
                </div>
              </div>

              <div class="tw:text-center">
                <Button
                  label="Начать настройку прямо сейчас"
                  icon="pi pi-arrow-right"
                  size="large"
                  class="px-10 py-4 tw:text-lg tw:font-semibold tw:shadow-xl tw:hover:shadow-2xl tw:transition-all tw:hover:scale-105 bg-gradient-to-r tw:from-blue-600 tw:to-purple-600"
                  @click="goTo('/manifest')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
