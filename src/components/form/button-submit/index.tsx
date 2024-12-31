import type { ButtonProps } from '@mui/material';

import { Save } from '@mui/icons-material';
import { alpha, Button, CircularProgress } from '@mui/material';

interface ButtonSubmitProps extends ButtonProps {
	isLoading?: boolean;
}

export const ButtonSubmit = ({ isLoading = false, sx, ...props }: ButtonSubmitProps) => {
	return (
		<Button
			sx={{
				px: 4,
				py: 1.5,
				borderRadius: 3,
				textTransform: 'none',
				fontSize: '1rem',
				fontWeight: 600,
				color: 'white',
				backgroundColor: theme => theme.palette.primary.main,
				boxShadow: theme => `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
				transition: 'all 0.3s ease',
				'&:hover': {
					backgroundColor: theme => theme.palette.primary.dark,
					boxShadow: theme => `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
					transform: 'translateY(-2px)',
				},
				'&:active': {
					backgroundColor: theme => theme.palette.primary.light,
					boxShadow: theme => `0 2px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
					transform: 'translateY(0)',
				},
				'&:disabled': {
					backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
					color: theme => alpha(theme.palette.common.white, 0.7),
				},
				...sx,
			}}
			disabled={isLoading}
			variant="contained"
			startIcon={!isLoading && <Save />}
			{...props}
		>
			{isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
		</Button>
	);
};
