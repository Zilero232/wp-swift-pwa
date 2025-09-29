<template>
  <div class="empty-state">
    <i :class="iconClass" class="empty-state__icon"></i>
    <h3 v-if="title" class="empty-state__title">{{ title }}</h3>
    <p v-if="description" class="empty-state__description">{{ description }}</p>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon?: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'pi pi-info-circle',
})

const iconClass = computed(() => `${props.icon} empty-state__icon`)
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

.empty-state__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.empty-state__title {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-weight: 600;
}

.empty-state__description {
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}
</style>
