import { Box } from '@mui/material';

import type { SettingsCardProps } from '..';

interface StatusUpdateProps extends Pick<SettingsCardProps, 'status'> {}

export const StatusUpdate = ({ status }: StatusUpdateProps) => {
	const { type } = status || {};

	if (!type) {
		return null;
	}

	const getStatusColor = (status?: string) => {
		switch (status) {
			case 'success':
				return '#4CAF50';
			case 'warning':
				return '#FFC107';
			case 'error':
				return '#F44336';
			default:
				return 'transparent';
		}
	};

	return (
		<Box
			sx={{
				position: 'absolute',
				right: 16,
				top: 16,
				width: 8,
				height: 8,
				borderRadius: '50%',
				bgcolor: getStatusColor(type),
				boxShadow: `0 0 8px ${getStatusColor(type)}`,
			}}
		/>
	);
};
