import { Analytics, Code, Dashboard, Description, Key, Notifications, Storage } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

import { useStore } from '@/store/index';
import { ROUTES_ENUM } from '@/types/modules/navigations';

interface NavLinkItem {
	icon: React.ReactNode;
	label: string;
	path: ROUTES_ENUM;
}

const menuItems: NavLinkItem[] = [
	{
		label: 'Dashboard',
		path: ROUTES_ENUM.Dashboard,
		icon: <Dashboard sx={{ fontSize: 20 }} />,
	},
	{
		label: 'Manifest',
		path: ROUTES_ENUM.Manifest,
		icon: <Description sx={{ fontSize: 20 }} />,
	},
	{
		label: 'Service Worker',
		path: ROUTES_ENUM.ServiceWorker,
		icon: <Code sx={{ fontSize: 20 }} />,
	},
	{
		label: 'Cache',
		path: ROUTES_ENUM.Cache,
		icon: <Storage sx={{ fontSize: 20 }} />,
	},
	{
		label: 'Notifications',
		path: ROUTES_ENUM.Notifications,
		icon: <Notifications sx={{ fontSize: 20 }} />,
	},
	{
		label: 'Analytics',
		path: ROUTES_ENUM.Analytics,
		icon: <Analytics sx={{ fontSize: 20 }} />,
	},
	{
		label: 'License',
		path: ROUTES_ENUM.License,
		icon: <Key sx={{ fontSize: 20 }} />,
	},
];

export const Navigation = () => {
	const {
		navigation: { currentPage },
	} = useStore();

	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'flex' },
				gap: 0.5,
				background: 'rgba(255, 255, 255, 0.03)',
				backdropFilter: 'blur(10px)',
				borderRadius: 3,
				p: 0.5,
				border: '1px solid rgba(255, 255, 255, 0.05)',
			}}
		>
			{menuItems.map(({ label, path, icon }) => {
				const active = currentPage === path;

				return (
					<Link
						href={`/wp-admin/admin.php?page=${path}`}
						key={label}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							color: active ? '#00c6fb' : 'black',
							bgcolor: active ? 'rgba(0, 198, 251, 0.1)' : 'transparent',
							border: '1px solid',
							borderColor: active ? 'rgba(0, 198, 251, 0.2)' : 'transparent',
							borderRadius: 2,
							px: 1.5,
							py: 0.75,
							textDecoration: 'none',
							transition: 'all 0.3s ease',
							position: 'relative',
							overflow: 'hidden',

							'&:hover': {
								color: '#00c6fb',
								bgcolor: 'rgba(0, 198, 251, 0.1)',
								transform: 'translateY(-1px)',

								'& .nav-description': {
									opacity: 1,
									transform: 'translateY(0)',
								},

								'&::before': {
									transform: 'translateX(100%)',
								},
							},

							'&::before': {
								content: '""',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
								transform: 'translateX(-100%)',
								transition: 'transform 0.6s ease',
							},
						}}
					>
						{icon}

						<Typography
							sx={{
								fontSize: '0.875rem',
								fontWeight: active ? 600 : 500,
								lineHeight: 1.2,
							}}
						>
							{label}
						</Typography>
					</Link>
				);
			})}
		</Box>
	);
};
