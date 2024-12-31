import { Box, Paper, Typography } from '@mui/material';

import { LICENSE_FEATURES } from '@/constants/modules/license';

export const FeatureCards = () => {
	return (
		<>
			{LICENSE_FEATURES.map((feature, index) => (
				<Paper
					key={index}
					sx={{
						p: 2,
						transition: 'all 0.3s ease',
						transform: 'translateX(0)',
						'&:hover': {
							transform: 'translateX(10px)',
							boxShadow: theme => theme.shadows[10],
							'& .feature-icon': {
								transform: 'rotate(360deg)',
								color: feature.color,
							},
						},
					}}
				>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 2,
								bgcolor: `${feature.color}15`,
								color: feature.color,
								transition: 'all 0.6s ease',
							}}
							className="feature-icon"
						>
							{feature.icon}
						</Box>

						<Box>
							<Typography variant="subtitle1" fontWeight="bold">
								{feature.title}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								{feature.description}
							</Typography>
						</Box>
					</Box>
				</Paper>
			))}
		</>
	);
};
