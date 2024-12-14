import { Paper } from '@mui/material';

interface MainLayoutProps {
	children: any;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<Paper
			sx={{
				flex: 1,
				p: 3,
				background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255,255,255,0.1)',
				minHeight: '70vh',
			}}
		>
			{children}
		</Paper>
	);
};
