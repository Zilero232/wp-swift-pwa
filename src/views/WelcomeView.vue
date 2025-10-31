<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const router = useRouter();

const features = [
  {
    icon: 'pi pi-mobile',
    title: 'Progressive Web App',
    description: 'Превратите ваш WordPress сайт в современное PWA приложение',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'pi pi-cog',
    title: 'Простая настройка',
    description: 'Интуитивный интерфейс для создания и настройки манифеста',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'pi pi-download',
    title: 'Установка на устройство',
    description: 'Пользователи смогут установить ваш сайт как приложение',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'pi pi-sync',
    title: 'Офлайн режим',
    description: 'Работа сайта даже без интернет-соединения',
    gradient: 'from-orange-500 to-red-500',
  },
];

const goTo = (route: string) => {
  router.push(route);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10 p-4 sm:p-8 py-12">
      <div class="text-center mb-16 animate-fade-in">
        <div class="mb-8">
          <div
            class="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6 animate-bounce-slow"
          >
            <i class="pi pi-bolt text-6xl text-white"></i>
          </div>
        </div>

        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Добро пожаловать в Swift PWA
        </h1>

        <p class="text-xl sm:text-2xl text-gray-700 mx-auto mb-10 font-medium">
          Создайте <span class="text-blue-600 font-bold">Progressive Web App</span> для вашего WordPress сайта

          <span class="inline-block animate-pulse">⚡</span>
        </p>

        <div class="flex gap-4 justify-center flex-wrap">
          <Button
            label="Настроить манифест"
            icon="pi pi-file-edit"
            severity="primary"
            size="large"
            class="px-8 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            @click="goTo('/manifest')"
          />

          <Button
            label="Просмотр PWA"
            icon="pi pi-eye"
            severity="secondary"
            size="large"
            outlined
            class="px-8 py-3 hover:scale-105 transition-all"
            @click="goTo('/preview')"
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Возможности вашего PWA</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="text-center">
              <div class="mb-5">
                <div
                  :class="[
                    'inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br shadow-lg',
                    feature.gradient,
                    'group-hover:scale-110 transition-transform duration-300',
                  ]"
                >
                  <i :class="[feature.icon, 'text-3xl text-white']"></i>
                </div>
              </div>

              <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {{ feature.title }}
              </h3>

              <p class="text-sm text-gray-600 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
            <div class="bg-white rounded-3xl p-8 sm:p-12">
              <div class="text-center mb-10">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">🚀 С чего начать?</h2>
                <p class="text-gray-600 text-lg">Следуйте простым шагам для создания вашего PWA</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                  >
                    1
                  </div>

                  <div
                    class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 pt-8 h-full border-2 border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <div class="mb-3">
                      <i class="pi pi-file-edit text-3xl text-blue-600"></i>
                    </div>
                    <h4 class="font-bold text-gray-800 mb-2 text-lg">Настройте манифест</h4>
                    <p class="text-sm text-gray-600">Заполните основную информацию: название, иконки, цвета</p>
                  </div>
                </div>

                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                  >
                    2
                  </div>

                  <div
                    class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 pt-8 h-full border-2 border-purple-200 hover:border-purple-400 transition-colors"
                  >
                    <div class="mb-3">
                      <i class="pi pi-eye text-3xl text-purple-600"></i>
                    </div>
                    <h4 class="font-bold text-gray-800 mb-2 text-lg">Проверьте результат</h4>
                    <p class="text-sm text-gray-600">Просмотрите манифест и убедитесь, что всё верно</p>
                  </div>
                </div>

                <div class="relative">
                  <div
                    class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                  >
                    3
                  </div>

                  <div
                    class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 pt-8 h-full border-2 border-green-200 hover:border-green-400 transition-colors"
                  >
                    <div class="mb-3">
                      <i class="pi pi-check-circle text-3xl text-green-600"></i>
                    </div>
                    <h4 class="font-bold text-gray-800 mb-2 text-lg">Сохраните настройки</h4>
                    <p class="text-sm text-gray-600">Нажмите "Сохранить" и ваш PWA готов!</p>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <Button
                  label="Начать настройку прямо сейчас"
                  icon="pi pi-arrow-right"
                  size="large"
                  class="px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600"
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
