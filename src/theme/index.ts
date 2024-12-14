import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#2271b1',
		},
		secondary: {
			main: '#135e96',
		},
		background: {
			default: '#f0f0f1',
		},
	},
	typography: {
		fontFamily:
			'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
		h4: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					padding: '16.5px 14px !important',
					minHeight: 'auto !important',
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					marginLeft: -9,
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					marginLeft: 0,
				},
			},
		},
	},
});
