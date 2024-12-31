import { Alert, Snackbar } from '@mui/material';

import type { NotificationInterface } from '@/types/modules/notification';

interface NotificationProps extends NotificationInterface {
	open: boolean;
	onClose: () => void;
}

const Notification = ({ open, message, severity, onClose }: NotificationProps) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			autoHideDuration={4000}
			onClose={onClose}
			open={open}
		>
			<Alert severity={severity} sx={{ width: '100%' }} variant="filled" onClose={onClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
