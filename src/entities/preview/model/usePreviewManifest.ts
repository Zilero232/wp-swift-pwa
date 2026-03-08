import { computed } from "vue";

import { useManifestQuery } from "@/entities/manifest/model/useManifestQuery";
import { useDownload } from "@/shared/composable/useDownload";
import { FILE_NAMES } from "@/shared/config/files.constants";

export const usePreviewManifest = () => {
  const { queryManifest } = useManifestQuery();
  const { copyToClipboard, downloadJSON } = useDownload();

  const manifestJSON = computed(() => {
    if (!queryManifest.data.value) return "";

    return JSON.stringify(queryManifest.data.value, null, 2);
  });

  const hasData = computed(() => {
    return queryManifest.data.value && Object.keys(queryManifest.data.value).length > 0;
  });

  const copy = () => {
    copyToClipboard(manifestJSON.value, {
      successMessage: "Manifest copied to clipboard",
      errorMessage: "Failed to copy manifest",
    });
  };

  const download = () => {
    if (!queryManifest.data.value) return;

    downloadJSON(queryManifest.data.value, FILE_NAMES.MANIFEST, {
      successMessage: "Manifest downloaded successfully",
      errorMessage: "Failed to download manifest",
    });
  };

  return {
    isLoadingManifest: queryManifest.isPending,
    hasManifestData: !!hasData.value,
    manifestJSON,
    copyManifest: copy,
    downloadManifest: download,
  };
};
