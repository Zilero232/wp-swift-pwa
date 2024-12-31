export enum DisplayModeEnum {
	Fullscreen = 'fullscreen',
	Standalone = 'standalone',
	MinimalUi = 'minimal-ui',
	Browser = 'browser',
}

export enum OrientationEnum {
	Any = 'any',
	Natural = 'natural',
	Landscape = 'landscape',
	Portrait = 'portrait',
}

export enum IconPurposeEnum {
	ANY = 'any',
	MASKABLE = 'maskable',
	MONOCHROME = 'monochrome',
}

export enum HandleLinksEnum {
	PREFERRED = 'preferred',
	UNHANDLED = 'unhandled',
}

export enum IconSizeEnum {
	STANDARD = 192, // Основной размер для Android
	SPLASH = 512, // Для сплэш-скрина
}

export enum DirectionEnum {
	LTR = 'ltr',
	RTL = 'rtl',
}

export interface Icon {
	description: string;
	key: string;
	purpose: IconPurposeEnum;
	size: IconSizeEnum;
}

export interface PWASettings {
	backgroundColor: string;
	categories: string[];
	description: string;
	direction: DirectionEnum;
	display: DisplayModeEnum;
	handleLinks: HandleLinksEnum;
	iarc: string;
	icons: Icon[];
	language: string;
	name: string;
	offlineMode: boolean;
	orientation: OrientationEnum;
	preferRelatedApplications: boolean;
	pushNotifications: boolean;
	scope: string;
	shareTarget: boolean;
	shortName: string;
	startUrl: string;
	themeColor: string;
	version: string;
}
