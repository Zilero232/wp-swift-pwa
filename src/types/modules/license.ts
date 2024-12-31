import type { ReactNode } from 'react';

export interface Feature {
	color: string;
	description: string;
	icon: ReactNode;
	title: string;
}

export interface Statistic {
	subtitle: string;
	title: string;
}
