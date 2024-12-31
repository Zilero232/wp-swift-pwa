import type { ReactNode } from 'react';

import { createContext, useState } from 'react';

import type { NotificationInterface } from '@/types/modules/notification';

import Notification from '@/components/notification';
import { NotificationSeverity } from '@/types/modules/notification';

export interface NotificationContextType {
	showNotification: ({ message, severity }: NotificationInterface) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
	showNotification: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [notification, setNotification] = useState<NotificationInterface & { open: boolean }>({
		open: false,
		message: '',
		severity: NotificationSeverity.SUCCESS,
	});

	const showNotification = ({ message, severity }: NotificationInterface) => {
		setNotification({ open: true, message, severity });
	};

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}

			<Notification {...notification} onClose={() => setNotification(prev => ({ ...prev, open: false }))} />
		</NotificationContext.Provider>
	);
};
