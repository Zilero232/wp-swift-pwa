import { Add, Delete, Refresh } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	Container,
	FormControlLabel,
	Grid,
	IconButton,
	MenuItem,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';

import { SettingsCard } from '@/components/settings-card';

const AnalyticsPage = () => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ p: 3 }}>
				<SettingsCard title="Analytics Configuration" description="Basic analytics settings and tracking options">
					<FormControlLabel label="Enable Analytics" sx={{ mb: 3 }} control={<Switch defaultChecked />} />
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth label="Tracking ID" sx={{ mb: 2 }} placeholder="UA-XXXXXXXXX-X" />
							<TextField fullWidth select defaultValue={26} label="Data Retention" sx={{ mb: 2 }}>
								{[
									{ value: 14, label: '14 months' },
									{ value: 26, label: '26 months' },
									{ value: 38, label: '38 months' },
									{ value: 50, label: '50 months' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth select defaultValue={100} label="Sampling Rate" sx={{ mb: 2 }}>
								{[
									{ value: 100, label: '100% (all users)' },
									{ value: 75, label: '75% of users' },
									{ value: 50, label: '50% of users' },
									{ value: 25, label: '25% of users' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField fullWidth defaultValue={1} label="Site Speed Sample Rate (%)" type="number" />
						</Grid>
					</Grid>
				</SettingsCard>

				<SettingsCard title="Tracked Metrics" description="Configure which metrics to track">
					<Grid spacing={2} container>
						{[
							{
								category: 'Installation',
								metrics: ['Total Installations', 'Installation Source', 'Installation Time', 'Device Type'],
							},
							{
								category: 'Performance',
								metrics: ['Load Time', 'First Paint', 'Time to Interactive', 'Cache Hit Rate'],
							},
							{
								category: 'Usage',
								metrics: ['Active Users', 'Session Duration', 'Pages per Session', 'Offline Usage'],
							},
							{
								category: 'Technical',
								metrics: [
									'Service Worker Status',
									'Cache Storage Size',
									'Push Notification Usage',
									'Background Sync Events',
								],
							},
						].map((group, index) => (
							<Grid item key={index} md={3} sm={6} xs={12}>
								<Typography sx={{ mb: 1 }} variant="subtitle2">
									{group.category}
								</Typography>
								{group.metrics.map((metric, i) => (
									<FormControlLabel
										key={i}
										sx={{
											display: 'block',
											'& .MuiFormControlLabel-label': {
												fontSize: '0.875rem',
											},
										}}
										label={metric}
										control={<Switch defaultChecked size="small" />}
									/>
								))}
							</Grid>
						))}
					</Grid>
				</SettingsCard>

				<SettingsCard title="Custom Events" description="Configure custom events to track">
					<TableContainer
						sx={{
							bgcolor: 'transparent',
							backgroundImage: 'none',
						}}
						component={Paper}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Event Name</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Parameters</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{[
									{
										name: 'file_download',
										category: 'Content',
										parameters: ['file_name', 'file_size', 'file_type'],
									},
									{
										name: 'notification_click',
										category: 'Engagement',
										parameters: ['notification_type', 'time_shown'],
									},
									{
										name: 'offline_usage',
										category: 'Technical',
										parameters: ['page_url', 'cache_status'],
									},
								].map((event, index) => (
									<TableRow key={index}>
										<TableCell>{event.name}</TableCell>
										<TableCell>{event.category}</TableCell>
										<TableCell>
											{event.parameters.map((param, i) => (
												<Chip
													key={i}
													sx={{
														m: 0.5,
														bgcolor: 'rgba(255,255,255,0.05)',
													}}
													label={param}
													size="small"
												/>
											))}
										</TableCell>
										<TableCell>
											<IconButton size="small" color="error">
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ mt: 2 }}>
						<Button variant="outlined" startIcon={<Add />}>
							Add Custom Event
						</Button>
					</Box>
				</SettingsCard>

				<SettingsCard title="Data Export" description="Export analytics data and configure automated reports">
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth select defaultValue="json" label="Export Format" sx={{ mb: 2 }}>
								{[
									{ value: 'json', label: 'JSON' },
									{ value: 'csv', label: 'CSV' },
									{ value: 'excel', label: 'Excel' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField fullWidth select defaultValue="monthly" label="Report Frequency">
								{[
									{ value: 'daily', label: 'Daily' },
									{ value: 'weekly', label: 'Weekly' },
									{ value: 'monthly', label: 'Monthly' },
								].map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField fullWidth label="Email Recipients" sx={{ mb: 2 }} placeholder="email@example.com" />
							<Button fullWidth variant="contained" startIcon={<Refresh />}>
								Generate Report Now
							</Button>
						</Grid>
					</Grid>
				</SettingsCard>
			</Box>
		</Container>
	);
};

export default AnalyticsPage;
