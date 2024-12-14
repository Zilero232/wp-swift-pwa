import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

import { Navigation } from './navigation';

export const Header = () => {
	return (
		<AppBar
			sx={{
				backgroundColor: 'background.paper',
				borderBottom: '1px solid',
				borderColor: 'divider',
				mb: 2.5,
				top: 'var(--wp-admin--admin-bar--height)',
			}}
			elevation={40}
			position="sticky"
		>
			<Container maxWidth={false}>
				<Toolbar
					disableGutters
					sx={{
						height: 60,
						minHeight: 60,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{/* Logo */}
						<Box
							sx={{
								height: 32,
								width: 32,
								transition: 'transform 0.2s ease-in-out',
								'&:hover': {
									transform: 'scale(1.05)',
								},
							}}
							alt="Logo"
							src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
							component="img"
							loading="lazy"
						/>

						{/* Heading */}
						<Typography
							sx={{
								fontWeight: 600,
								background: theme =>
									`linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
								backgroundClip: 'text',
								WebkitBackgroundClip: 'text',
								color: 'transparent',
							}}
							variant="h6"
							component="h1"
						>
							WP Swift PWA
						</Typography>
					</Box>

					{/* Navigation */}
					<Box sx={{ display: { xs: 'none', md: 'block' } }}>
						<Navigation />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
