<script setup lang="ts">
import {
 computed 
} from 'vue';

import InputField from '@/shared/ui/InputField.vue';
import SelectField from '@/shared/ui/SelectField.vue';

import {
 useServiceWorkerQuery 
} from '../model/useServiceWorkerQuery';

import {
  REGISTRATION_UPDATE_VIA_CACHE_OPTIONS,
  REGISTRATION_TYPE_OPTIONS,
  DEFAULT_REGISTRATION_SCOPE,
} from '../constants';

import type {
 RegistrationConfig 
} from '@/shared/types/service-worker';

const {
 queryServiceWorker, updateServiceWorker 
} = useServiceWorkerQuery();

const registration = computed(() => queryServiceWorker.data.value?.registration);

const updateRegistration = (payload: Partial<RegistrationConfig>) => {
  if (!registration.value) return;

  updateServiceWorker({
    registration: {
      ...registration.value,
      ...payload,
    },
  });
};

const validateScope = (value: string): boolean => {
  return value.startsWith('/') && !value.includes(' ');
};

const handleScopeUpdate = (value: string) => {
  if (validateScope(value)) {
    updateRegistration({
      scope: value,
    });
  }
};
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-6">
    <div class="tw:bg-blue-50 tw:border tw:border-blue-200 tw:rounded-lg tw:p-4">
      <div class="tw:flex tw:items-start tw:gap-3">
        <i class="pi pi-info-circle tw:text-blue-600 tw:mt-0.5"></i>

        <div class="tw:text-sm tw:text-blue-800">
          <p class="tw:font-medium tw:mb-1">О настройках регистрации</p>
          <p class="tw:text-blue-700">
            Настройки регистрации определяют область действия Service Worker и поведение
            при обновлениях. Изменяйте эти параметры только если понимаете их назначение.
          </p>
        </div>
      </div>
    </div>

    <InputField
      label="Scope (область действия)"
      icon="pi pi-globe"
      :placeholder="DEFAULT_REGISTRATION_SCOPE"
      :model-value="registration?.scope"
      @update:model-value="handleScopeUpdate"
    />

    <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6">
      <SelectField
        label="Update Via Cache"
        icon="pi pi-refresh"
        :options="REGISTRATION_UPDATE_VIA_CACHE_OPTIONS"
        :model-value="registration?.update_via_cache"
        @update:model-value="updateRegistration({ update_via_cache: $event })"
      />

      <SelectField
        label="Тип скрипта"
        icon="pi pi-code"
        :options="REGISTRATION_TYPE_OPTIONS"
        :model-value="registration?.type"
        @update:model-value="updateRegistration({ type: $event })"
      />
    </div>
  </div>
</template>
