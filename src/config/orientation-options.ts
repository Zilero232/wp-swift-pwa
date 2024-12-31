import { OrientationEnum } from '@/types/modules/settings';

interface OrientationOption {
	description: string;
	docs: string;
	label: string;
	value: OrientationEnum;
}

export const ORIENTATION_OPTIONS: OrientationOption[] = [
	{
		value: OrientationEnum.Any,
		label: 'Любая',
		description: 'Приложение адаптируется под любую ориентацию',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation#any',
	},
	{
		value: OrientationEnum.Natural,
		label: 'Естественная',
		description: 'Использует естественную ориентацию устройства',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation#natural',
	},
	{
		value: OrientationEnum.Landscape,
		label: 'Альбомная',
		description: 'Фиксированная альбомная ориентация',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation#landscape',
	},
	{
		value: OrientationEnum.Portrait,
		label: 'Портретная',
		description: 'Фиксированная портретная ориентация',
		docs: 'https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation#portrait',
	},
];
