import { useToast } from './useToast';

interface DownloadOptions {
  filename: string;
  mimeType?: string;
  successMessage?: string;
  errorMessage?: string;
}

interface CopyOptions {
  successMessage?: string;
  errorMessage?: string;
}

export function useDownload() {
  const { showSuccess, showError } = useToast();

  /**
   * Copy text to clipboard
   */
  const copyToClipboard = async (text: string, options?: CopyOptions) => {
    const {
      successMessage = 'Скопировано в буфер обмена',
      errorMessage = 'Ошибка копирования',
    } = options || {};

    try {
      await navigator.clipboard.writeText(text);

      showSuccess(successMessage);

      return true;
    } catch (error) {
      showError(errorMessage);

      console.error('Failed to copy to clipboard:', error);

      return false;
    }
  };

  /**
   * Download content as file
   */
  const downloadFile = (content: string | Blob, options: DownloadOptions) => {
    const {
      filename,
      mimeType = 'text/plain',
      successMessage = 'Файл загружен',
      errorMessage = 'Ошибка загрузки файла',
    } = options;

    try {
      const blob =
        content instanceof Blob ? content : new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = filename;
      document.body.appendChild(a);

      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showSuccess(successMessage);

      return true;
    } catch (error) {
      showError(errorMessage);

      console.error('Failed to download file:', error);

      return false;
    }
  };

  /**
   * Download JSON file
   */
  const downloadJSON = (
    data: unknown,
    filename: string,
    options?: Omit<DownloadOptions, 'filename' | 'mimeType'>,
  ) => {
    const jsonString = JSON.stringify(data, null, 2);

    return downloadFile(jsonString, {
      filename: filename.endsWith('.json') ? filename : `${filename}.json`,
      mimeType: 'application/json',
      ...options,
    });
  };

  return {
    copyToClipboard,
    downloadFile,
    downloadJSON,
  };
}
