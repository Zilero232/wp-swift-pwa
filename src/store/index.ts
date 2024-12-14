import { create } from 'zustand';

import type { SettingsSlice } from './slices/settings-slice';

import { createSettingsSlice } from './slices/settings-slice';

export interface StoreState extends SettingsSlice {}

export const useStore = create<StoreState>()((...args) => ({
	...createSettingsSlice(...args),
}));
