import { CheckCircle } from '@mui/icons-material';
import { Alert, Box, Typography } from '@mui/material';

import { AVAILABLE_FEATURES } from '@/constants/modules/license';

export const LicenseInfo = () => {
	return (
		<>
			<Alert severity="success" sx={{ mb: 3, p: 2 }}>
				<Typography sx={{ fontWeight: 'bold', mb: 1 }} variant="subtitle1">
					Лицензия успешно активирована!
				</Typography>

				<Typography variant="body2">Срок действия: до 31.12.2024</Typography>
			</Alert>

			<Typography variant="h6" color="inherit" gutterBottom>
				Доступные возможности:
			</Typography>

			<Box sx={{ mb: 3 }}>
				{AVAILABLE_FEATURES.map((feature, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							mb: 1,
						}}
					>
						<CheckCircle sx={{ color: 'inherit' }} fontSize="small" />

						<Typography color="inherit">{feature}</Typography>
					</Box>
				))}
			</Box>

			<Typography sx={{ opacity: 0.9 }} variant="body2" color="inherit">
				Если у вас возникли вопросы, обратитесь в службу поддержки через личный кабинет или по email:
				support@example.com
			</Typography>
		</>
	);
};
