import { Grid, Typography } from '@mui/material';

import { LICENSE_STATISTICS } from '@/constants/modules/license';

export const Statistics = () => {
	return (
		<Grid spacing={3} sx={{ maxWidth: 1000, mx: 'auto' }} container>
			{LICENSE_STATISTICS.map((stat, index) => (
				<Grid item key={index} md={4} xs={12}>
					<Typography
						sx={{
							fontWeight: 'bold',
							color: 'primary.main',
						}}
						variant="h3"
					>
						{stat.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{stat.subtitle}
					</Typography>
				</Grid>
			))}
		</Grid>
	);
};
