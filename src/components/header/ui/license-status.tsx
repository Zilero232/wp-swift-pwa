import { VpnKey } from '@mui/icons-material';
import Diamond from '@mui/icons-material/Diamond';
import { Box, Chip, Link, Typography } from '@mui/material';

import { ROUTES_ENUM } from '@/types/modules/navigations';

export const LicenseStatus = () => {
	const isLicenseActive = false;

	return (
		<>
			{isLicenseActive && (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Chip
						sx={{
							height: 28,
							background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
							color: 'white',
							fontWeight: 600,
							borderRadius: 1.5,
							animation: 'shine 3s infinite',
							'@keyframes shine': {
								'0%': {
									boxShadow: '0 0 5px rgba(0, 198, 251, 0.5)',
								},
								'50%': {
									boxShadow: '0 0 20px rgba(0, 198, 251, 0.5)',
								},
								'100%': {
									boxShadow: '0 0 5px rgba(0, 198, 251, 0.5)',
								},
							},
							'& .MuiChip-icon': {
								color: 'white',
								fontSize: 14,
								mr: 0.5,
							},
						}}
						label="PRO"
						size="small"
						icon={<Diamond sx={{ fontSize: 16 }} />}
					/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							py: 0.5,
							px: 1.5,
							height: 28,
							borderRadius: 1.5,
							background: 'rgba(0, 198, 251, 0.1)',
							border: '1px solid rgba(0, 198, 251, 0.2)',
						}}
					>
						<VpnKey
							sx={{
								color: '#00c6fb',
								fontSize: 16,
								animation: 'float 2s infinite ease-in-out',
								'@keyframes float': {
									'0%, 100%': { transform: 'translateY(0)' },
									'50%': { transform: 'translateY(-2px)' },
								},
							}}
						/>
						<Typography
							sx={{
								color: '#00c6fb',
								fontWeight: 500,
							}}
							variant="caption"
						>
							Valid until Dec 31, 2024
						</Typography>
					</Box>
				</Box>
			)}

			{!isLicenseActive && (
				<Link
					href={`/wp-admin/admin.php?page=${ROUTES_ENUM.License}`}
					sx={{
						textDecoration: 'none',
						'&:hover .license-chip': {
							transform: 'translateY(-1px)',
							boxShadow: '0 4px 12px rgba(255, 76, 76, 0.2)',
						},
					}}
				>
					<Chip
						sx={{
							height: 28,
							bgcolor: 'rgba(255, 76, 76, 0.1)',
							color: '#ff4c4c',
							border: '1px solid rgba(255, 76, 76, 0.2)',
							borderRadius: 1.5,
							transition: 'all 0.3s ease',
							cursor: 'pointer',
							'& .MuiChip-icon': {
								color: '#ff4c4c',
								fontSize: 14,
								mr: 0.5,
							},
						}}
						className="license-chip"
						label="Activate PRO version"
						size="small"
						icon={<VpnKey sx={{ fontSize: 16 }} />}
					/>
				</Link>
			)}
		</>
	);
};
