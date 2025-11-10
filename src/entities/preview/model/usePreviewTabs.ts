import {
 ref, watch 
} from 'vue';

import {
 FILE_NAMES 
} from '@/shared/config/files.constants';

interface UsePreviewTabsProps {
  onManifestTab?: () => void;
  onServiceWorkerTab?: () => void;
}

export function usePreviewTabs({
  onManifestTab,
  onServiceWorkerTab,
}: UsePreviewTabsProps) {
  const activeTabValue = ref<string>(FILE_NAMES.MANIFEST);

  watch(
    activeTabValue,
    (value) => {
      if (value === FILE_NAMES.MANIFEST) {
        onManifestTab?.();
      } else if (value === FILE_NAMES.SERVICE_WORKER) {
        onServiceWorkerTab?.();
      }
    },
    {
      immediate: true,
    },
  );

  const setActiveTab = (value: any) => {
    activeTabValue.value = value;
  };

  return {
    activeTabValue,
    setActiveTab,
  };
}
