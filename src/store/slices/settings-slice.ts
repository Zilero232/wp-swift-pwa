import type { PWASettings } from 'types';
import type { StateCreator } from 'zustand';

import { defaultSettings } from 'config/default-settings';

export interface SettingsSlice {
	settings: {
		data: PWASettings;
		isLoading: boolean;
		error: string | null;
	};
	settingsActions: {
		updateSettings: (newSettings: Partial<PWASettings>) => void;
		setLoading: (isLoading: boolean) => void;
		setError: (error: string | null) => void;
		resetSettings: () => void;
	};
}

export const createSettingsSlice: StateCreator<SettingsSlice> = set => ({
	settings: {
		data: defaultSettings,
		isLoading: false,
		error: null,
	},

	settingsActions: {
		updateSettings: newSettings => {
			set(state => ({
				settings: {
					...state.settings,
					data: { ...state.settings.data, ...newSettings },
				},
			}));
		},

		setLoading: isLoading => {
			set(state => ({
				settings: { ...state.settings, isLoading },
			}));
		},

		setError: error => {
			set(state => ({
				settings: { ...state.settings, error },
			}));
		},

		resetSettings: () => {
			set(state => ({
				settings: { ...state.settings, data: defaultSettings },
			}));
		},
	},
});
