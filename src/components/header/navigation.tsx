import { Dashboard, Help, Settings } from '@mui/icons-material';
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { PageKey } from '@/router/index';

import { ROUTES_ENUM } from '@/constants/modules/routes';

interface NavLinkItem {
	active?: boolean;
	icon: React.ReactNode;
	label: string;
	path: PageKey;
}

const menuItems: NavLinkItem[] = [
	{
		label: 'Swift PWA',
		path: ROUTES_ENUM.Home,
		icon: <Dashboard />,
		active: true,
	},
	{
		label: 'Settings',
		path: ROUTES_ENUM.Settings,
		icon: <Settings />,
	},
	{
		label: 'Help',
		path: ROUTES_ENUM.Help,
		icon: <Help />,
	},
];

export const Navigation = () => {
	return (
		<List sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
			{menuItems.map(({ label, path, active, icon: Icon }) => (
				<ListItem disablePadding key={label}>
					<ListItemButton
						href={path}
						sx={{
							borderRadius: 1,
							my: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'primary.main',
								color: 'primary.contrastText',
								'&:hover': {
									backgroundColor: 'primary.dark',
								},
								'& .MuiListItemIcon-root': {
									color: 'inherit',
								},
							},
						}}
						selected={active}
						component={Link}
					>
						<ListItemIcon sx={{ color: active ? 'inherit' : 'black', minWidth: 40 }}>{Icon}</ListItemIcon>

						<ListItemText
							sx={{
								whiteSpace: 'nowrap',
								color: active ? 'inherit' : 'black',
								fontSize: '0.875rem',
								fontWeight: active ? 600 : 400,
							}}
							primary={label}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
