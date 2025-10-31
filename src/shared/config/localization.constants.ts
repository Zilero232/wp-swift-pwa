import { TextDirection } from '@/shared/types/manifest';

/**
 * Text direction options for dropdown
 */
export const TEXT_DIRECTION_OPTIONS = [
  { label: 'LTR (Слева направо)', value: TextDirection.LTR },
  { label: 'RTL (Справа налево)', value: TextDirection.RTL },
  { label: 'Auto (Автоматически)', value: TextDirection.AUTO },
];

/**
 * Language options for dropdown
 */
export const LANGUAGE_OPTIONS = [
  { label: 'English (en)', value: 'en' },
  { label: 'English US (en-US)', value: 'en-US' },
  { label: 'English GB (en-GB)', value: 'en-GB' },
  { label: 'Русский (ru)', value: 'ru' },
  { label: 'Русский RU (ru-RU)', value: 'ru-RU' },
  { label: 'Español (es)', value: 'es' },
  { label: 'Français (fr)', value: 'fr' },
  { label: 'Deutsch (de)', value: 'de' },
  { label: '中文 (zh)', value: 'zh' },
  { label: '日本語 (ja)', value: 'ja' },
  { label: '한국어 (ko)', value: 'ko' },
  { label: 'Português (pt)', value: 'pt' },
  { label: 'Italiano (it)', value: 'it' },
];
