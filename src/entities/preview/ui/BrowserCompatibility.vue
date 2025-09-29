<template>
  <div class="browser-compatibility">
    <div class="pwa-features">
      <div v-for="feature in features" :key="feature" class="feature-item">
        <i class="pi pi-check-circle"></i>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="browser-info">
      <p class="info-text">
        <i class="pi pi-info-circle"></i>
        PWA функции поддерживаются во всех современных браузерах
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  features: string[]
}

defineProps<Props>()
</script>

<style scoped>
.browser-compatibility {
  padding: 1rem;
}

.pwa-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--green-50);
  border: 1px solid var(--green-200);
  border-radius: 6px;
  color: var(--green-700);
}

.feature-item i {
  color: var(--green-600);
}

.browser-info {
  text-align: center;
  padding: 1rem;
  background: var(--surface-100);
  border-radius: 6px;
}

.info-text {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-color-secondary);
}

.info-text i {
  color: var(--primary-color);
}
</style>
