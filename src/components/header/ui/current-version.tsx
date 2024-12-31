import { Bolt } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';

export const CurrentVersion = () => {
	const pluginVersion = '2.1.0';

	return (
		<Tooltip title="Current plugin version">
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 0.5,
					py: 0.5,
					px: 1,
					height: 28,
					borderRadius: 1.5,
					background: 'linear-gradient(135deg, rgba(0, 198, 251, 0.15), rgba(0, 91, 234, 0.15))',
					border: '1px solid rgba(0, 198, 251, 0.2)',
					transition: 'all 0.3s ease',
					'&:hover': {
						background: 'linear-gradient(135deg, rgba(0, 198, 251, 0.2), rgba(0, 91, 234, 0.2))',
					},
				}}
			>
				<Bolt sx={{ fontSize: 14, color: '#00c6fb' }} />

				<Typography
					sx={{
						color: '#00c6fb',
						fontWeight: 600,
						letterSpacing: '0.5px',
					}}
					variant="caption"
				>
					{pluginVersion}
				</Typography>
			</Box>
		</Tooltip>
	);
};
