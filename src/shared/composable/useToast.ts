import type { ToastMessageOptions } from "primevue";
import { useToast as usePrimeToast } from "primevue/usetoast";

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

  const showSuccess = (detail: string, summary = "Success") => {
    showToast({
      severity: "success",
      summary,
      detail,
    });
  };

  const showError = (detail: string, summary = "Error") => {
    showToast({
      severity: "error",
      summary,
      detail,
    });
  };

  const showWarn = (detail: string, summary = "Warning") => {
    showToast({
      severity: "warn",
      summary,
      detail,
    });
  };

  const showInfo = (detail: string, summary = "Information") => {
    showToast({
      severity: "info",
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
