import { CheckCircle, Info } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';

import type { SettingsCardProps } from '..';

interface CardHeaderProps extends Pick<SettingsCardProps, 'header' | 'status'> {
	isHovered: boolean;
	rightContent?: React.ReactNode;
}

export const CardHeader = ({ header, status, isHovered, rightContent }: CardHeaderProps) => {
	const { icon, title, helpText } = header || {};
	const { lastUpdated } = status || {};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
			}}
		>
			<Box sx={{ display: 'flex', gap: 2 }}>
				{icon && (
					<Box
						sx={{
							color: '#2196F3',
							bgcolor: '#E3F2FD',
							p: 1,
							borderRadius: 1.5,
							display: 'flex',
							alignItems: 'center',
							transition: 'all 0.3s ease',
							transform: isHovered ? 'scale(1.1)' : 'scale(1)',
						}}
					>
						{icon}
					</Box>
				)}

				<Box>
					<Typography
						sx={{
							fontWeight: 600,
							color: '#1976D2',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
						variant="h6"
					>
						{title}

						{helpText && (
							<Tooltip placement="top" title={helpText} arrow>
								<Info
									sx={{
										fontSize: 18,
										color: '#90CAF9',
										cursor: 'help',
										'&:hover': { color: '#2196F3' },
									}}
								/>
							</Tooltip>
						)}
					</Typography>

					{lastUpdated && (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 0.5,
								mt: 1,
								color: '#9E9E9E',
								fontSize: '0.75rem',
							}}
						>
							<CheckCircle sx={{ fontSize: 14, color: '#4CAF50' }} />
							Last updated: {lastUpdated}
						</Box>
					)}
				</Box>
			</Box>

			{rightContent && <Box sx={{ ml: 3 }}>{rightContent}</Box>}
		</Box>
	);
};
