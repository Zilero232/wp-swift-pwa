import { Add, Delete } from '@mui/icons-material';
import { Box, Button, Chip, Container, Grid, LinearProgress, MenuItem, TextField, Typography } from '@mui/material';

import { SettingsCard } from '@/components/settings-card';

const CachePage = () => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ p: 3 }}>
				<SettingsCard title="Cache Strategy" description="Configure caching strategies for different resource types">
					<Grid spacing={3} container>
						{[
							{ type: 'Images', path: '\.(?:png|jpg|jpeg|svg|gif)$' },
							{ type: 'Scripts', path: '\.js$' },
							{ type: 'Styles', path: '\.css$' },
							{ type: 'Fonts', path: '\.(?:woff|woff2|ttf|eot)$' },
							{ type: 'HTML', path: '\.html$' },
							{ type: 'API', path: '/api/' },
						].map((resource, index) => (
							<Grid item key={index} md={6} xs={12}>
								<Box sx={{ mb: 3 }}>
									<Typography sx={{ mb: 1 }} variant="subtitle2">
										{resource.type}
									</Typography>
									<TextField fullWidth select defaultValue="cache-first" label="Strategy" size="small" sx={{ mb: 1 }}>
										{[
											{ value: 'cache-first', label: 'Cache First' },
											{ value: 'network-first', label: 'Network First' },
											{ value: 'stale-while-revalidate', label: 'Stale While Revalidate' },
											{ value: 'network-only', label: 'Network Only' },
											{ value: 'cache-only', label: 'Cache Only' },
										].map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
									<TextField fullWidth defaultValue={resource.path} label="Pattern" size="small" />
								</Box>
							</Grid>
						))}
					</Grid>
				</SettingsCard>

				<SettingsCard title="Cache Storage" description="Manage cache storage and limits">
					<Grid spacing={3} container>
						<Grid item md={6} xs={12}>
							<TextField fullWidth defaultValue={50} label="Maximum Cache Size (MB)" sx={{ mb: 2 }} type="number" />
							<TextField fullWidth defaultValue={30} label="Cache Duration (days)" type="number" />
						</Grid>
						<Grid item md={6} xs={12}>
							<Box sx={{ mb: 2 }}>
								<Typography sx={{ mb: 1 }} variant="subtitle2">
									Current Cache Usage
								</Typography>
								<LinearProgress
									sx={{
										height: 10,
										borderRadius: 1,
										bgcolor: 'rgba(255,255,255,0.1)',
										'& .MuiLinearProgress-bar': {
											bgcolor: '#00c6fb',
										},
									}}
									value={65}
									variant="determinate"
								/>
								<Typography sx={{ mt: 0.5, display: 'block' }} variant="caption">
									32.5 MB of 50 MB used
								</Typography>
							</Box>
							<Button fullWidth variant="outlined" color="error" startIcon={<Delete />}>
								Clear All Cache
							</Button>
						</Grid>
					</Grid>
				</SettingsCard>

				<SettingsCard title="Excluded Paths" description="Paths that should not be cached">
					<Box sx={{ mb: 2 }}>
						{['/api/auth/*', '/api/payments/*', '/admin/*', '*.pdf'].map((path, index) => (
							<Chip key={index} label={path} sx={{ m: 0.5, bgcolor: 'rgba(255,255,255,0.05)' }} onDelete={() => {}} />
						))}
					</Box>
					<TextField fullWidth label="Add Excluded Path" sx={{ mb: 2 }} placeholder="/path/to/exclude" />
					<Button variant="outlined" startIcon={<Add />}>
						Add Path
					</Button>
				</SettingsCard>

				<SettingsCard title="Cache Analytics" description="Cache hit rates and performance metrics">
					<Grid spacing={3} container>
						{[
							{ label: 'Cache Hit Rate', value: '87%' },
							{ label: 'Average Load Time', value: '0.8s' },
							{ label: 'Cache Success', value: '95%' },
							{ label: 'Network Requests Saved', value: '1,234' },
						].map((metric, index) => (
							<Grid item key={index} md={3} sm={6} xs={12}>
								<Box
									sx={{
										p: 2,
										textAlign: 'center',
										border: '1px solid rgba(255,255,255,0.1)',
										borderRadius: 1,
									}}
								>
									<Typography sx={{ color: '#00c6fb' }} variant="h4">
										{metric.value}
									</Typography>
									<Typography sx={{ color: 'text.secondary' }} variant="body2">
										{metric.label}
									</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</SettingsCard>
			</Box>
		</Container>
	);
};

export default CachePage;
