export enum Direction {
	LTR = 'ltr',
	RTL = 'rtl',
}

export enum Display {
	BROWSER = 'browser',
	FULLSCREEN = 'fullscreen',
	MINIMAL_UI = 'minimal-ui',
	STANDALONE = 'standalone',
}

export enum HandleLinks {
	PREFERRED = 'preferred',
	UNHANDLED = 'unhandled',
}

export enum Orientation {
	ANY = 'any',
	LANDSCAPE = 'landscape',
	NATURAL = 'natural',
	PORTRAIT = 'portrait',
}

export interface PWASettings {
	backgroundColor: string;
	categories: string[];
	description: string;
	direction: Direction;
	display: Display;
	handleLinks: HandleLinks;
	iarc: string;
	language: string;
	name: string;
	offlineMode: boolean;
	orientation: Orientation;
	preferRelatedApplications: boolean;
	pushNotifications: boolean;
	scope: string;
	shareTarget: boolean;
	shortName: string;
	startUrl: string;
	themeColor: string;
	version: string;
}
