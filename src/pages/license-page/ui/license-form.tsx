import { Key } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const LicenseForm = () => {
	const [licenseKey, setLicenseKey] = useState('');

	const isActiveLicense = false;

	const handleActivate = () => {
		return setLicenseKey('');
	};

	const onKeyChange = () => {
		return setLicenseKey('');
	};

	return (
		<Box
			sx={{
				p: 3,
				borderRadius: 2,
				bgcolor: 'background.paper',
				boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)',
				mb: 4,
			}}
			component="form"
		>
			<Typography variant="h6" gutterBottom>
				Введите ваш лицензионный ключ
			</Typography>

			<TextField
				fullWidth
				label="Лицензионный ключ"
				sx={{ mb: 2 }}
				value={licenseKey}
				onChange={e => onKeyChange(e.target.value)}
				placeholder="XXXX-XXXX-XXXX-XXXX"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Key sx={{ mr: 1, color: 'action.active' }} />
							</InputAdornment>
						),
					},
				}}
			/>

			<Button
				fullWidth
				sx={{
					background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
					transition: 'all 0.3s ease',
					'&:hover': {
						transform: 'translateY(-2px)',
						boxShadow: '0 8px 15px rgba(33,150,243,0.3)',
					},
				}}
				size="large"
				variant="contained"
				onClick={handleActivate}
			>
				Активировать лицензию
			</Button>
		</Box>
	);
};
