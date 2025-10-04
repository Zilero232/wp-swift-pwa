<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Dialog, Button, InputText, Dropdown } from 'primevue';

import FormField from '@/shared/ui/FormField.vue';
import { ICON_TYPES, ICON_PURPOSES } from '@/shared/config/constants';
import type { ManifestIcon } from '@/shared/types/manifest';

interface Props {
  visible: boolean;
  icon?: ManifestIcon | null;
  editing?: boolean;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'save', icon: ManifestIcon): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  editing: false,
});

const emit = defineEmits<Emits>();

const form = ref<ManifestIcon>({
  src: '',
  sizes: '',
  type: 'image/png',
});

const errors = ref<Record<string, string>>({});
const imageError = ref(false);

const isValid = computed(() => {
  return (
    form.value.src.length > 0 &&
    form.value.sizes.length > 0 &&
    form.value.type.length > 0 &&
    Object.keys(errors.value).length === 0
  );
});

const validateForm = () => {
  errors.value = {};

  if (!form.value.src.trim()) {
    errors.value.src = 'URL иконки обязательно';
  } else if (!isValidUrl(form.value.src)) {
    errors.value.src = 'Неверный формат URL';
  }

  if (!form.value.sizes.trim()) {
    errors.value.sizes = 'Размеры обязательны';
  } else if (!isValidSizes(form.value.sizes)) {
    errors.value.sizes = 'Неверный формат размеров';
  }

  if (!form.value.type) {
    errors.value.type = 'Тип файла обязателен';
  }
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith('/');
  }
};

const isValidSizes = (sizes: string): boolean => {
  return /^\d+x\d+$/.test(sizes) || sizes === 'any';
};

const handleSubmit = () => {
  validateForm();

  if (isValid.value) {
    emit('save', { ...form.value });
  }
};

watch(
  () => props.icon,
  (newIcon) => {
    if (newIcon) {
      form.value = { ...newIcon };
    } else {
      form.value = {
        src: '',
        sizes: '',
        type: 'image/png',
      };
    }
    errors.value = {};
    imageError.value = false;
  },
  { immediate: true },
);

watch(() => form.value, validateForm, { deep: true });
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="editing ? 'Редактировать иконку' : 'Добавить иконку'"
    modal
    class="w-full max-w-md"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <FormField label="URL иконки" :error="errors.src" required>
        <InputText v-model="form.src" placeholder="https://example.com/icon.png" class="w-full" />
      </FormField>

      <div class="grid grid-cols-2 gap-4">
        <FormField label="Размеры" help="Например: 192x192 или any" :error="errors.sizes" required>
          <InputText v-model="form.sizes" placeholder="192x192" class="w-full" />
        </FormField>

        <FormField label="Тип файла" :error="errors.type" required>
          <Dropdown
            v-model="form.type"
            :options="ICON_TYPES"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </FormField>
      </div>

      <FormField label="Назначение">
        <Dropdown
          v-model="form.purpose"
          :options="ICON_PURPOSES"
          option-label="label"
          option-value="value"
          placeholder="Выберите назначение"
          class="w-full"
          show-clear
        />
      </FormField>

      <div
        v-if="form.src && !imageError"
        class="text-center p-4 border border-dashed border-gray-300 rounded-lg"
      >
        <img
          :src="form.src"
          alt="Preview"
          @error="imageError = true"
          class="max-w-16 max-h-16 rounded-lg mx-auto"
        />
      </div>
    </form>

    <template #footer>
      <Button label="Отмена" text @click="$emit('cancel')" />
      <Button
        :label="editing ? 'Сохранить' : 'Добавить'"
        @click="handleSubmit"
        :disabled="!isValid"
      />
    </template>
  </Dialog>
</template>
