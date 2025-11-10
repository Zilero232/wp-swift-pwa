import {
 computed 
} from 'vue';

import {
 useServiceWorkerQuery 
} from '@/entities/service-worker/model/useServiceWorkerQuery';

import {
 useDownload 
} from '@/shared/composable/useDownload';

import {
 FILE_NAMES 
} from '@/shared/config/files.constants';

export function usePreviewServiceWorker() {
  const {
 queryServiceWorkerCode 
} = useServiceWorkerQuery();
  const {
 copyToClipboard, downloadFile 
} = useDownload();

  const code = computed(() => queryServiceWorkerCode.data.value || '');

  const copy = () => {
    copyToClipboard(code.value, {
      successMessage: 'Service Worker код скопирован в буфер обмена',
      errorMessage: 'Ошибка копирования кода',
    });
  };

  const download = () => {
    if (!code.value) return;

    downloadFile(code.value, {
      filename: FILE_NAMES.SERVICE_WORKER,
      mimeType: 'application/javascript',
      successMessage: 'Service Worker успешно загружен',
      errorMessage: 'Ошибка загрузки файла',
    });
  };

  const load = () => {
    queryServiceWorkerCode.refetch();
  };

  return {
    isLoadingServiceWorker: queryServiceWorkerCode.isFetching,
    hasServiceWorkerData: !!code.value,
    serviceWorkerCode: code,
    copyServiceWorker: copy,
    downloadServiceWorker: download,
    loadServiceWorkerCode: load,
  };
}
