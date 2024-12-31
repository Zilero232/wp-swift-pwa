import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/app';

import { theme } from './theme';

createRoot(document.getElementById('wp-swift-pwa-root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<App />
		</ThemeProvider>
	</StrictMode>,
);
