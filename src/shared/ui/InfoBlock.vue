<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
  severity?: 'info' | 'success' | 'warning' | 'danger' | 'help';
  asList?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  icon: 'pi-info-circle',
  severity: 'info',
  asList: false,
});

const severityClasses = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: 'text-blue-600',
    list: 'text-blue-800',
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-900',
    icon: 'text-green-600',
    list: 'text-green-800',
  },
  warning: {
    container: 'bg-orange-50 border-orange-200 text-orange-900',
    icon: 'text-orange-600',
    list: 'text-orange-800',
  },
  danger: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-600',
    list: 'text-red-800',
  },
  help: {
    container: 'bg-purple-50 border-purple-200 text-purple-900',
    icon: 'text-purple-600',
    list: 'text-purple-800',
  },
};

const classes = severityClasses[props.severity];
</script>

<template>
  <div :class="['border rounded-lg p-4 text-sm', classes.container]">
    <div class="flex items-center gap-2">
      <i :class="['mt-0.5', icon, classes.icon]"></i>

      <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
    </div>

    <div class="flex-1">
      <ul v-if="asList" :class="['list-disc list-inside space-y-1', classes.list]">
        <slot></slot>
      </ul>

      <div v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
