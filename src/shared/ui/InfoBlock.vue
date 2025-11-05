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
    container: 'tw:bg-blue-50 tw:border-blue-200 tw:text-blue-900',
    icon: 'tw:text-blue-600',
    list: 'tw:text-blue-800',
  },
  success: {
    container: 'tw:bg-green-50 tw:border-green-200 tw:text-green-900',
    icon: 'tw:text-green-600',
    list: 'tw:text-green-800',
  },
  warning: {
    container: 'tw:bg-orange-50 tw:border-orange-200 tw:text-orange-900',
    icon: 'tw:text-orange-600',
    list: 'tw:text-orange-800',
  },
  danger: {
    container: 'tw:bg-red-50 tw:border-red-200 tw:text-red-900',
    icon: 'tw:text-red-600',
    list: 'tw:text-red-800',
  },
  help: {
    container: 'tw:bg-purple-50 tw:border-purple-200 tw:text-purple-900',
    icon: 'tw:text-purple-600',
    list: 'tw:text-purple-800',
  },
};

const classes = severityClasses[props.severity];
</script>

<template>
  <div :class="['tw:border tw:rounded-lg tw:p-4 tw:text-sm', classes.container]">
    <div class="tw:flex tw:items-center tw:gap-2">
      <i :class="['mt-0.5', icon, classes.icon]"></i>

      <p v-if="title" class="tw:font-semibold tw:mb-1">{{ title }}</p>
    </div>

    <div class="tw:flex-1">
      <ul
        v-if="asList"
        :class="['tw:list-disc tw:list-inside tw:space-y-1', classes.list]"
      >
        <slot></slot>
      </ul>

      <div v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
