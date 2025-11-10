import {
 useToast as usePrimeToast 
} from 'primevue/usetoast';
import type {
 ToastMessageOptions 
} from 'primevue';

const defaultOptions: ToastMessageOptions = {
  life: 3000,
  closable: true,
};

export const useToast = () => {
  const toast = usePrimeToast();

  const showToast = (options: ToastMessageOptions) => {
    toast.add({
      ...defaultOptions,
      ...options,
    });
  };

  const showSuccess = (detail: string, summary = 'Успешно') => {
    showToast({
      severity: 'success',
      summary,
      detail,
    });
  };

  const showError = (detail: string, summary = 'Ошибка') => {
    showToast({
      severity: 'error',
      summary,
      detail,
    });
  };

  const showWarn = (detail: string, summary = 'Внимание') => {
    showToast({
      severity: 'warn',
      summary,
      detail,
    });
  };

  const showInfo = (detail: string, summary = 'Информация') => {
    showToast({
      severity: 'info',
      summary,
      detail,
    });
  };

  return {
    showToast,
    showSuccess,
    showError,
    showWarn,
    showInfo,
  };
};
