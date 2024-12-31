import { Box } from '@mui/material';

import type { SettingsCardProps } from '..';

interface CategoryCardProps extends Pick<SettingsCardProps, 'header'> {}

export const CategoryCard = ({ header }: CategoryCardProps) => {
	const { category } = header || {};

	if (!category) {
		return null;
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				top: -10,
				left: 24,
				bgcolor: '#fff',
				color: '#2196F3',
				px: 2,
				py: 0.5,
				borderRadius: 1,
				fontSize: '0.75rem',
				fontWeight: 600,
				border: '1px solid #E3F2FD',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
			}}
		>
			{category}
		</Box>
	);
};
