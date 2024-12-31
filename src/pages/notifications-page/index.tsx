import { Add } from '@mui/icons-material';
import { Box, Button, Chip, Container, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';

import { SettingsCard } from '@/components/settings-card';

const NotificationsPage = () => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ p: 3 }}>
				<SettingsCard title="Push Notifications" description="Configure push notification settings and permissions">
					<FormControlLabel label="Enable Push Notifications" sx={{ mb: 3 }} control={<Switch defaultChecked />} />
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth multiline label="VAPID Public Key" sx={{ mb: 2 }} rows={2} />
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth multiline label="VAPID Private Key" sx={{ mb: 2 }} rows={2} />
						</Grid>
					</Grid>
					<Button variant="contained" color="primary">
						Generate New Keys
					</Button>
				</SettingsCard>

				<SettingsCard
					title="Notification Templates"
					description="Predefined notification templates for different scenarios"
				>
					{[
						{
							title: 'Welcome Message',
							body: 'Thank you for installing our PWA!',
							actions: ['Open App', 'Settings'],
						},
						{
							title: 'New Content',
							body: 'New content is available!',
							actions: ['View', 'Later'],
						},
					].map((template, index) => (
						<Box
							key={index}
							sx={{
								p: 2,
								mb: 2,
								border: '1px solid rgba(255,255,255,0.1)',
								borderRadius: 1,
							}}
						>
							<TextField fullWidth defaultValue={template.title} label="Title" sx={{ mb: 2 }} />
							<TextField fullWidth multiline defaultValue={template.body} label="Body" sx={{ mb: 2 }} rows={2} />
							<Box sx={{ display: 'flex', gap: 1 }}>
								{template.actions.map((action, i) => (
									<Chip key={i} label={action} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} onDelete={() => {}} />
								))}
								<Button size="small" startIcon={<Add />}>
									Add Action
								</Button>
							</Box>
						</Box>
					))}
					<Button variant="outlined" startIcon={<Add />}>
						Add Template
					</Button>
				</SettingsCard>

				<SettingsCard title="Default Settings" description="Default configuration for notifications">
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth label="Default Icon URL" sx={{ mb: 2 }} placeholder="/icon-192x192.png" />
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth label="Default Badge URL" sx={{ mb: 2 }} placeholder="/badge.png" />
						</Grid>
						<Grid item xs={12}>
							<TextField fullWidth select defaultValue={0} label="Default Notification Duration">
								{[
									{ value: 0, label: 'Until clicked' },
									{ value: 5000, label: '5 seconds' },
									{ value: 10000, label: '10 seconds' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
				</SettingsCard>
			</Box>
		</Container>
	);
};

export default NotificationsPage;
