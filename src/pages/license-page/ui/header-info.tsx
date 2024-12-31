import { Box, Typography } from '@mui/material';

export const HeaderInfo = () => {
	return (
		<Box sx={{ textAlign: 'center', mb: 6 }}>
			<Typography
				sx={{
					mb: 2,
					background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					fontWeight: 'bold',
				}}
				variant="h3"
			>
				Улучшите свой сайт с Premium
			</Typography>

			<Typography
				sx={{
					maxWidth: 800,
					mx: 'auto',
					mb: 4,
				}}
				variant="h6"
				color="text.secondary"
			>
				Разблокируйте полный потенциал вашего PWA приложения с нашей премиум лицензией. Получите доступ к эксклюзивным
				функциям и приоритетной поддержке.
			</Typography>
		</Box>
	);
};
