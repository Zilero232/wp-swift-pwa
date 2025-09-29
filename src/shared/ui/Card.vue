<template>
  <div class="card">
    <div v-if="$slots.header || title" class="card__header">
      <slot name="header">
        <h3 class="card__title">{{ title }}</h3>
        <p v-if="description" class="card__description">{{ description }}</p>
      </slot>
    </div>

    <div class="card__content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  border: 1px solid var(--surface-border);
  overflow: hidden;
}

.card__header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.card__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.card__description {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.card__content {
  padding: 1.5rem;
}

.card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--surface-border);
  background: var(--surface-50);
}
</style>
