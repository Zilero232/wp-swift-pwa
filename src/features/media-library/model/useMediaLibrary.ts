import {
 computed, shallowRef, toValue, type MaybeRefOrGetter 
} from 'vue';
import {
 useQuery, useQueryClient 
} from '@tanstack/vue-query';
import {
 refDebounced 
} from '@vueuse/core';

import {
 mediaAPI, type MediaLibraryResponse 
} from '@/services/media.service';
import {
 useToast 
} from '@/shared/composable/useToast';

import type {
 MediaAttachment 
} from '@/shared/types/media';

interface UseMediaLibraryOptions {
  visible: MaybeRefOrGetter<boolean>;
}

export function useMediaLibrary({
 visible 
}: UseMediaLibraryOptions) {
  const {
 showSuccess 
} = useToast();
  const queryClient = useQueryClient();

  const searchQuery = shallowRef('');
  const debouncedSearchValue = refDebounced(searchQuery, 500);

  const queryKey = computed(() => {
    return ['media-library', debouncedSearchValue.value];
  });

  const {
 isLoading, data 
} = useQuery({
    queryKey,
    queryFn: async () => {
      return await mediaAPI.getLibrary({
        search: debouncedSearchValue.value,
        per_page: 24,
      });
    },
    enabled: computed(() => toValue(visible)),
  });

  const libraryItems = computed(() => data.value?.items ?? []);

  const addUploadedToLibrary = (uploadedData: MediaAttachment) => {
    queryClient.setQueryData(queryKey.value, (oldData?: MediaLibraryResponse) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        items: [uploadedData, ...oldData.items],
      };
    });
  };

  return {
    searchQuery,
    libraryItems,
    isLoading,
    addUploadedToLibrary,
    showSuccessMessage: () => showSuccess('Изображение выбрано'),
  };
}
