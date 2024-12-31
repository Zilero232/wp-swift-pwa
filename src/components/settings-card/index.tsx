import { Box, Card, Divider } from '@mui/material';
import { useState } from 'react';

import { CardHeader } from './ui/card-header';
import { CategoryCard } from './ui/category-card';
import { MainContent } from './ui/main-content';
import { StatusUpdate } from './ui/status-update';

interface HeaderProps {
	category?: string;
	helpText?: string;
	icon?: React.ReactNode;
	title: string;
}

interface StatusProps {
	lastUpdated?: string;
	type?: 'error' | 'success' | 'warning';
}

export interface SettingsCardProps {
	children: React.ReactNode;
	header?: HeaderProps;
	status?: StatusProps;
	onChange?: (name: string, value: any) => void;
}

export const SettingsCard = ({ children, header, status }: SettingsCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card
			sx={{
				mb: 3,
				background: '#fff',
				border: '1px solid',
				borderColor: isHovered ? '#e0e0e0' : '#f5f5f5',
				borderRadius: 2,
				transition: 'all 0.3s ease',
				position: 'relative',
				overflow: 'visible',
				boxShadow: isHovered ? '0 8px 24px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
				'&:hover': {
					transform: 'translateY(-2px)',
				},
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<CategoryCard header={header} />

			<Box sx={{ p: 3 }}>
				<CardHeader header={header} status={status} isHovered={isHovered} />

				<Divider sx={{ my: 2 }} />

				<MainContent>{children}</MainContent>
			</Box>

			<StatusUpdate status={status} />
		</Card>
	);
};
