import type { Icon } from '@/types/modules/settings';

import { IconPurposeEnum, IconSizeEnum } from '@/types/modules/settings';

export const REQUIRED_ICONS: Icon[] = [
	{
		key: 'standard',
		size: IconSizeEnum.STANDARD,
		purpose: IconPurposeEnum.ANY,
		description: 'Standard icon for devices and app stores',
	},
	{
		key: 'maskable',
		size: IconSizeEnum.STANDARD,
		purpose: IconPurposeEnum.MASKABLE,
		description: 'Adaptive icon with safe zone for Android',
	},
	{
		key: 'splash',
		size: IconSizeEnum.SPLASH,
		purpose: IconPurposeEnum.ANY,
		description: 'Large icon for splash screens and installation',
	},
];
