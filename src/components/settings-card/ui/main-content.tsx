import { Box } from '@mui/material';

interface MainContentProps {
	children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
	return (
		<Box
			sx={{
				position: 'relative',
				'& .MuiTextField-root': {
					'& .MuiOutlinedInput-root': {
						bgcolor: '#F5F5F5',
						'&:hover': {
							bgcolor: '#FAFAFA',
						},
					},
				},
				'& .MuiButton-outlined': {
					borderColor: '#E0E0E0',
					color: '#616161',
					'&:hover': {
						borderColor: '#2196F3',
						bgcolor: '#E3F2FD',
					},
				},
			}}
		>
			{children}
		</Box>
	);
};
