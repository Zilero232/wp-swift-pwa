import {
 useMutation 
} from '@tanstack/vue-query';

import {
 mediaAPI 
} from '@/services/media.service';
import {
 useToast 
} from '@/shared/composable/useToast';

export function useMediaUpload() {
  const {
 showSuccess, showError 
} = useToast();

  const {
 mutate: uploadFile, isPending: isUploading 
} = useMutation({
    mutationFn: async (file: File) => {
      return await mediaAPI.uploadFile(file);
    },
    onSuccess: (data) => {
      showSuccess('Изображение загружено');
      return data;
    },
    onError: () => {
      showError('Не удалось загрузить изображение');
    },
  });

  return {
    uploadFile,
    isUploading,
  };
}
