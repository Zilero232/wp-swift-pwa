import { Box } from '@mui/material';

import Router from '@/router/index';

import { Header } from './header/header';

const App = () => {
	return (
		<Box sx={{ py: 4 }}>
			<Header />

			<Router />
		</Box>
	);
};

export default App;
