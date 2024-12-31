import { Box, styled, Typography } from '@mui/material';

const LogoWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(2),
	cursor: 'pointer',
	transition: 'transform 0.2s ease-in-out',

	'&:hover': {
		transform: 'scale(1.02)',

		'& img': {
			transform: 'rotate(-5deg)',
		},
	},
}));

const LogoImage = styled('img')(({ theme }) => ({
	height: 32,
	width: 32,
	transition: 'transform 0.3s ease',
}));

const LogoText = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	color: 'transparent',
	textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

export const Logo = () => {
	return (
		<LogoWrapper>
			<LogoImage
				alt="Logo"
				src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
				loading="lazy"
			/>

			<LogoText variant="h6" component="h1">
				WP Swift PWA
			</LogoText>
		</LogoWrapper>
	);
};
