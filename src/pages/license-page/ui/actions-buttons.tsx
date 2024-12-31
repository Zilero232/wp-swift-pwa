import { CompareArrows, History } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

interface ActionButtonsProps {
	isLicenseActive: boolean;
	onHistoryClick: () => void;
	onPlansClick: () => void;
}

export const ActionButtons = ({ isLicenseActive, onPlansClick, onHistoryClick }: ActionButtonsProps) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 16,
				right: 16,
				display: 'flex',
				gap: 1,
				zIndex: 2,
			}}
		>
			<Tooltip title="Сравнить тарифные планы">
				<IconButton
					sx={{
						bgcolor: 'rgba(255, 255, 255, 0.1)',
						backdropFilter: 'blur(4px)',
						'&:hover': {
							bgcolor: 'rgba(255, 255, 255, 0.2)',
						},
					}}
					onClick={onPlansClick}
				>
					<CompareArrows sx={{ color: isLicenseActive ? 'white' : 'primary.main' }} />
				</IconButton>
			</Tooltip>

			{isLicenseActive && (
				<Tooltip title="История активаций">
					<IconButton
						sx={{
							bgcolor: 'rgba(255, 255, 255, 0.1)',
							backdropFilter: 'blur(4px)',
							'&:hover': {
								bgcolor: 'rgba(255, 255, 255, 0.2)',
							},
						}}
						onClick={onHistoryClick}
					>
						<History sx={{ color: 'white' }} />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
};
