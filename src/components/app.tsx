import { Box } from '@mui/material';

import { NotificationProvider } from '@/context/notification-context';
import Router from '@/router/index';

import Header from './header';

const App = () => {
	return (
		<Box sx={{ py: 4 }}>
			<Header />

			<NotificationProvider>
				<Router />
			</NotificationProvider>
		</Box>
	);
};

export default App;
