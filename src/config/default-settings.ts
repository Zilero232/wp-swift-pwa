import { DisplayModeEnum, OrientationEnum } from '@/types/modules/settings';

import type { PWASettings } from '../types';

export const DEFAULT_SETTINGS: PWASettings = {
	appName: 'Super Progressive Web Apps',
	shortName: 'SuperPWA',
	description: 'Progressive Web Apps Plugin for WordPress',
	icon: '',
	splashIcon: '',
	backgroundColor: '#ffffff',
	themeColor: '#ffffff',
	startPage: 'homepage',
	useAMP: false,
	orientation: OrientationEnum.Portrait,
	display: DisplayModeEnum.Standalone,
};
