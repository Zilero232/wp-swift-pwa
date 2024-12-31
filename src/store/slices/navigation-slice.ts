import type { StateCreator } from 'zustand';

import { ROUTES_ENUM } from '@/types/modules/navigations';

export interface NavigationSlice {
	navigation: {
		currentPage: ROUTES_ENUM;
	};
	navigationActions: {
		setCurrentPage: (page: ROUTES_ENUM) => void;
	};
}

export const createNavigationSlice: StateCreator<NavigationSlice> = set => ({
	navigation: {
		currentPage: ROUTES_ENUM.Settings,
	},

	navigationActions: {
		setCurrentPage: (page: ROUTES_ENUM) => {
			set(state => ({
				navigation: {
					...state.navigation,
					currentPage: page,
				},
			}));
		},
	},
});
