import { create } from 'zustand';

import type { NavigationSlice } from './slices/navigation-slice';
import type { SettingsSlice } from './slices/settings-slice';

import { createNavigationSlice } from './slices/navigation-slice';
import { createSettingsSlice } from './slices/settings-slice';

export interface StoreState extends SettingsSlice, NavigationSlice {}

export const useStore = create<StoreState>()((...args) => ({
	...createSettingsSlice(...args),
	...createNavigationSlice(...args),
}));
