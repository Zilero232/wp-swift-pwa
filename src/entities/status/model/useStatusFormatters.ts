export const useStatusFormatters = () => {
  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'N/A';

    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(2)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  };

  const formatDate = (timestamp: number | null): string => {
    if (!timestamp) return 'N/A';

    return new Date(timestamp * 1000).toLocaleString('ru-RU');
  };

  return { formatFileSize, formatDate };
};
