import { computed } from 'vue';

import { useManifestQuery } from '@/entities/manifest/model/useManifestQuery';

import { useDownload } from '@/shared/composable/useDownload';

import { FILE_NAMES } from '@/shared/config/files.constants';

export function usePreviewManifest() {
  const { queryManifest } = useManifestQuery();
  const { copyToClipboard, downloadJSON } = useDownload();

  const isLoading = computed(() => queryManifest.isPending.value);

  const manifestJSON = computed(() => {
    if (!queryManifest.data.value) return '';

    return JSON.stringify(queryManifest.data.value, null, 2);
  });

  const hasData = computed(() => {
    return queryManifest.data.value && Object.keys(queryManifest.data.value).length > 0;
  });

  const copy = () => {
    copyToClipboard(manifestJSON.value, {
      successMessage: 'Манифест скопирован в буфер обмена',
      errorMessage: 'Ошибка копирования манифеста',
    });
  };

  const download = () => {
    if (!queryManifest.data.value) return;

    downloadJSON(queryManifest.data.value, FILE_NAMES.MANIFEST, {
      successMessage: 'Манифест успешно загружен',
      errorMessage: 'Ошибка загрузки манифеста',
    });
  };

  return {
    isLoadingManifest: isLoading,
    hasManifestData: hasData,
    manifestJSON,
    copyManifest: copy,
    downloadManifest: download,
  };
}
