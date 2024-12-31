import { DisplayModeEnum } from '@/types/modules/settings';

interface DisplayOption {
	description: string;
	docs: string;
	label: string;
	value: DisplayModeEnum;
}

export const DISPLAY_OPTIONS: DisplayOption[] = [
	{
		value: DisplayModeEnum.Standalone,
		label: 'Отдельное приложение',
		description: 'Приложение запускается в отдельном окне, без элементов браузера',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/display#standalone',
	},
	{
		value: DisplayModeEnum.Fullscreen,
		label: 'Полный экран',
		description: 'Приложение занимает весь экран устройства',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/display#fullscreen',
	},
	{
		value: DisplayModeEnum.MinimalUi,
		label: 'Минимальный UI',
		description: 'Отображается с минимальным набором элементов управления браузера',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/display#minimal-ui',
	},
	{
		value: DisplayModeEnum.Browser,
		label: 'Браузер',
		description: 'Стандартное отображение в браузере',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/display#browser',
	},
];
