import { AppBar, Box } from '@mui/material';

import { CurrentVersion } from './ui/current-version';
import { LicenseStatus } from './ui/license-status';
import { Logo } from './ui/logo';
import { Navigation } from './ui/navigation';

const Header = () => {
	return (
		<AppBar
			sx={{
				background: 'rgba(255, 255, 255, 0.08)',
				backdropFilter: 'blur(20px) saturate(180%)',
				borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
				boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
				transition: 'all 0.3s ease',
				py: 1.5,
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '3px',
					background: 'linear-gradient(90deg, #00c6fb, #005bea)',
				},
			}}
			position="sticky"
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					px: { xs: 2, md: 3 },
					gap: 4,
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
					<Logo />

					<Navigation />
				</Box>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						ml: 'auto',
					}}
				>
					<CurrentVersion />

					<LicenseStatus />
				</Box>
			</Box>
		</AppBar>
	);
};

export default Header;
