import { ref } from 'vue';

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
) {
  const timeoutId = ref<number | null>(null);

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    timeoutId.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  const cancel = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);

      timeoutId.value = null;
    }
  };

  return {
    debouncedFn,
    cancel,
  };
}
