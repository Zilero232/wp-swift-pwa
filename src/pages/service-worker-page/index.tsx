import { Add } from '@mui/icons-material';
import { Box, Button, Chip, Container, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';

import { SettingsCard } from '@/components/settings-card';

const ServiceWorkerPage = () => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ p: 3 }}>
				<SettingsCard
					title="Service Worker Configuration"
					description="Basic service worker settings and update strategy"
				>
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth defaultValue="1.0.0" label="Service Worker Version" sx={{ mb: 2 }} />
							<TextField fullWidth select defaultValue="prompt" label="Update Strategy" sx={{ mb: 2 }}>
								{[
									{ value: 'prompt', label: 'Prompt user for update' },
									{ value: 'auto', label: 'Auto update' },
									{ value: 'periodic', label: 'Periodic check' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField fullWidth defaultValue={24} label="Update Check Interval (hours)" type="number" />
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth defaultValue="/" label="Scope" sx={{ mb: 2 }} />
							<TextField fullWidth defaultValue="/sw.js" label="Registration Path" sx={{ mb: 2 }} />
						</Grid>
					</Grid>
				</SettingsCard>

				<SettingsCard title="Background Sync" description="Configure background synchronization settings">
					<FormControlLabel label="Enable Background Sync" sx={{ mb: 3 }} control={<Switch defaultChecked />} />
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth defaultValue={5} label="Max Retries" sx={{ mb: 2 }} type="number" />
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth defaultValue={30} label="Timeout (minutes)" sx={{ mb: 2 }} type="number" />
						</Grid>
					</Grid>
				</SettingsCard>

				<SettingsCard title="Precache Resources" description="Resources to cache during service worker installation">
					<Box sx={{ mb: 2 }}>
						{['/index.html', '/styles/main.css', '/scripts/app.js', '/images/logo.png'].map((resource, index) => (
							<Chip
								key={index}
								label={resource}
								sx={{ m: 0.5, bgcolor: 'rgba(255,255,255,0.05)' }}
								onDelete={() => {}}
							/>
						))}
					</Box>
					<TextField fullWidth label="Add Resource Path" sx={{ mb: 2 }} placeholder="/path/to/resource" />
					<Button variant="outlined" startIcon={<Add />}>
						Add Resource
					</Button>
				</SettingsCard>

				<SettingsCard title="Custom Code" description="Add custom service worker code">
					<TextField
						fullWidth
						multiline
						defaultValue={`// Custom Service Worker Code
self.addEventListener('fetch', (event) => {
  // Your custom fetch handler
});`}
						InputProps={{
							style: { fontFamily: 'monospace' },
						}}
						rows={10}
					/>
				</SettingsCard>
			</Box>
		</Container>
	);
};

export default ServiceWorkerPage;
