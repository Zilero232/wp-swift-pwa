import {
	Cached,
	CheckCircle,
	CloudDownload,
	Code,
	DeleteSweep,
	Notifications,
	PhoneIphone,
	Refresh,
	Send,
	Speed,
	Storage,
	SystemUpdate,
	TrendingUp,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	Chip,
	Container,
	Grid,
	IconButton,
	LinearProgress,
	Tooltip,
	Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';

// Типы
interface StatCard {
	change: string;
	color: string;
	icon: React.ReactNode;
	label: string;
	suffix: string;
	value: number | string;
}

interface QuickAction {
	color: string;
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

interface InstallSource {
	color: string;
	label: string;
	value: number;
}

interface Activity {
	icon: React.ReactNode;
	message: string;
	time: string;
	type: string;
}

const DashboardPage = () => {
	// Моковые данные для статистики
	const stats: StatCard[] = [
		{
			icon: <PhoneIphone className="icon" sx={{ fontSize: 24 }} />,
			label: 'Total Installations',
			value: 1243,
			suffix: ' installs',
			color: '#00c6fb',
			change: '+12%',
		},
		{
			icon: <Storage className="icon" sx={{ fontSize: 24 }} />,
			label: 'Cache Storage',
			value: '234MB',
			suffix: ' (1,432 items)',
			color: '#0052cc',
			change: '+8%',
		},
		{
			icon: <Notifications className="icon" sx={{ fontSize: 24 }} />,
			label: 'Push Subscribers',
			value: 856,
			suffix: ' users',
			color: '#005bea',
			change: '+15%',
		},
		{
			icon: <CloudDownload className="icon" sx={{ fontSize: 24 }} />,
			label: 'Offline Usage',
			value: 324,
			suffix: ' sessions',
			color: '#0084ff',
			change: '+5%',
		},
	];

	// Быстрые действия
	const quickActions: QuickAction[] = [
		{
			label: 'Update Cache',
			icon: <Cached />,
			color: '#00c6fb',
			onClick: () => console.log('Update Cache'),
		},
		{
			label: 'Test Push',
			icon: <Send />,
			color: '#0084ff',
			onClick: () => console.log('Test Push'),
		},
		{
			label: 'Clear Storage',
			icon: <DeleteSweep />,
			color: '#ff4c4c',
			onClick: () => console.log('Clear Storage'),
		},
		{
			label: 'Update SW',
			icon: <SystemUpdate />,
			color: '#2ecc71',
			onClick: () => console.log('Update SW'),
		},
	];

	// Источники установки
	const installSources: InstallSource[] = [
		{ label: 'Browser Prompt', value: 45, color: '#00c6fb' },
		{ label: 'Custom Button', value: 30, color: '#0084ff' },
		{ label: 'External Link', value: 15, color: '#005bea' },
		{ label: 'QR Code', value: 10, color: '#0052cc' },
	];

	// Последние действия
	const recentActivities: Activity[] = [
		{
			type: 'install',
			message: 'New installation from Chrome',
			time: '2 min ago',
			icon: <PhoneIphone sx={{ color: '#00c6fb' }} />,
		},
		{
			type: 'cache',
			message: 'Cache storage optimized',
			time: '15 min ago',
			icon: <Storage sx={{ color: '#0084ff' }} />,
		},
		{
			type: 'push',
			message: 'Push notification sent',
			time: '1 hour ago',
			icon: <Notifications sx={{ color: '#005bea' }} />,
		},
	];

	// Данные для графика
	const chartData = {
		xAxis: [
			{
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				scaleType: 'band' as const,
			},
		],
		series: [
			{
				data: [450, 680, 890, 1243, 1580, 1890],
				area: true,
				color: '#00c6fb',
				showMark: true,
			},
		],
	};

	return (
		<Container maxWidth="xl">
			<Box sx={{ p: 3 }}>
				{/* Header */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 4,
					}}
				>
					<Box>
						<Typography
							sx={{
								fontWeight: 600,
								background: 'linear-gradient(45deg, #00c6fb, #005bea)',
								backgroundClip: 'text',
								WebkitBackgroundClip: 'text',
								color: 'transparent',
								mb: 1,
							}}
							variant="h4"
						>
							PWA Overview
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography sx={{ color: 'text.secondary' }} variant="body2">
								Last updated: 2 minutes ago
							</Typography>
							<Chip
								sx={{
									bgcolor: 'rgba(255,255,255,0.05)',
									border: '1px solid rgba(255,255,255,0.1)',
								}}
								label="v2.1.0"
								size="small"
							/>
							<IconButton
								sx={{
									transition: 'transform 0.3s ease',
									'&:hover': { transform: 'rotate(180deg)' },
								}}
								size="small"
							>
								<Refresh sx={{ fontSize: 18 }} />
							</IconButton>
						</Box>
					</Box>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<Chip
							sx={{
								bgcolor: 'rgba(46, 204, 113, 0.1)',
								color: '#2ecc71',
								border: '1px solid rgba(46, 204, 113, 0.2)',
							}}
							label="PWA Ready"
							icon={<CheckCircle sx={{ fontSize: 16 }} />}
						/>
						<Chip
							sx={{
								bgcolor: 'rgba(0, 198, 251, 0.1)',
								color: '#00c6fb',
								border: '1px solid rgba(0, 198, 251, 0.2)',
							}}
							label="Performance: 95%"
							icon={<Speed sx={{ fontSize: 16 }} />}
						/>
					</Box>
				</Box>

				{/* Quick Actions */}
				<Grid spacing={3} container>
					<Grid item xs={12}>
						<Card
							sx={{
								p: 2,
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								mb: 3,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									gap: 2,
									flexWrap: 'wrap',
								}}
							>
								{quickActions.map((action, index) => (
									<Tooltip key={index} title={`Click to ${action.label}`}>
										<Button
											sx={{
												color: action.color,
												borderColor: `${action.color}40`,
												bgcolor: `${action.color}10`,
												'&:hover': {
													borderColor: action.color,
													bgcolor: `${action.color}20`,
												},
											}}
											variant="outlined"
											onClick={action.onClick}
											startIcon={action.icon}
										>
											{action.label}
										</Button>
									</Tooltip>
								))}
							</Box>
						</Card>
					</Grid>
					{/* Main Stats */}
					{stats.map((stat, index) => (
						<Grid item key={index} md={3} sm={6} xs={12}>
							<Card
								sx={{
									p: 2,
									height: '100%',
									background: 'rgba(255, 255, 255, 0.05)',
									backdropFilter: 'blur(10px)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
									transition: 'all 0.3s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
										boxShadow: `0 8px 24px ${stat.color}20`,
									},
								}}
							>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Box sx={{ color: stat.color }}>{stat.icon}</Box>
									<Typography sx={{ ml: 1, color: 'text.secondary', fontSize: '0.875rem' }}>{stat.label}</Typography>
								</Box>
								<Typography
									sx={{
										fontWeight: 600,
										color: stat.color,
										display: 'flex',
										alignItems: 'baseline',
									}}
									variant="h4"
								>
									{stat.value}
									<Typography
										sx={{
											fontSize: '0.875rem',
											color: 'text.secondary',
											ml: 0.5,
										}}
										component="span"
									>
										{stat.suffix}
									</Typography>
								</Typography>
								<Typography
									sx={{
										fontSize: '0.75rem',
										color: '#2ecc71',
										mt: 1,
										display: 'flex',
										alignItems: 'center',
										gap: 0.5,
									}}
								>
									<TrendingUp sx={{ fontSize: 16 }} />
									{stat.change} since last month
								</Typography>
							</Card>
						</Grid>
					))}

					{/* Charts & Details */}
					<Grid item md={8} xs={12}>
						<Card
							sx={{
								p: 3,
								height: '100%',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									mb: 3,
								}}
							>
								<Box>
									<Typography sx={{ mb: 0.5 }} variant="h6">
										Installation Growth
									</Typography>
									<Typography sx={{ color: 'text.secondary' }} variant="body2">
										Monthly PWA installations
									</Typography>
								</Box>
								<Chip
									sx={{
										bgcolor: 'rgba(46, 204, 113, 0.1)',
										color: '#2ecc71',
										border: '1px solid rgba(46, 204, 113, 0.2)',
									}}
									label="+38% vs last month"
									size="small"
									icon={<TrendingUp sx={{ fontSize: 16 }} />}
								/>
							</Box>
							<Box sx={{ height: 300, width: '100%' }}>
								<LineChart
									sx={{
										'.MuiLineElement-root': {
											strokeWidth: 2,
										},
										'.MuiMarkElement-root': {
											stroke: '#00c6fb',
											scale: '0.6',
											fill: '#fff',
										},
										'.MuiChartsAxis-line': {
											stroke: 'rgba(255,255,255,0.1)',
										},
										'.MuiChartsAxis-tick': {
											stroke: 'rgba(255,255,255,0.1)',
										},
										'.MuiChartsAxis-label': {
											fill: 'rgba(255,255,255,0.5)',
										},
										'.MuiAreaElement-root': {
											fill: 'url(#gradient)',
											opacity: 0.15,
										},
									}}
									height={300}
									series={chartData.series}
									xAxis={chartData.xAxis}
								>
									<defs>
										<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
											<stop offset="0%" stopColor="#00c6fb" stopOpacity={0.4} />
											<stop offset="100%" stopColor="#00c6fb" stopOpacity={0} />
										</linearGradient>
									</defs>
								</LineChart>
							</Box>
						</Card>
					</Grid>

					{/* Installation Sources */}
					<Grid item md={4} xs={12}>
						<Card
							sx={{
								p: 3,
								height: '100%',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
							}}
						>
							<Typography sx={{ mb: 3 }} variant="h6">
								Installation Sources
							</Typography>
							{installSources.map((source, index) => (
								<Box key={index} sx={{ mb: 2 }}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											mb: 1,
										}}
									>
										<Typography variant="body2">{source.label}</Typography>
										<Typography variant="body2" color={source.color}>
											{source.value}%
										</Typography>
									</Box>
									<LinearProgress
										sx={{
											height: 6,
											borderRadius: 1,
											bgcolor: `${source.color}20`,
											'& .MuiLinearProgress-bar': {
												bgcolor: source.color,
											},
										}}
										value={source.value}
										variant="determinate"
									/>
								</Box>
							))}
						</Card>
					</Grid>

					{/* Recent Activity */}
					<Grid item md={4} xs={12}>
						<Card
							sx={{
								p: 3,
								height: '100%',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
							}}
						>
							<Typography sx={{ mb: 3 }} variant="h6">
								Recent Activity
							</Typography>
							{recentActivities.map((activity, index) => (
								<Box
									key={index}
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 2,
										mb: 2,
										p: 1.5,
										borderRadius: 1,
										bgcolor: 'rgba(255, 255, 255, 0.03)',
										border: '1px solid rgba(255, 255, 255, 0.06)',
										transition: 'all 0.3s ease',
										'&:hover': {
											bgcolor: 'rgba(255, 255, 255, 0.05)',
										},
									}}
								>
									{activity.icon}
									<Box>
										<Typography variant="body2">{activity.message}</Typography>
										<Typography variant="caption" color="text.secondary">
											{activity.time}
										</Typography>
									</Box>
								</Box>
							))}
						</Card>
					</Grid>

					{/* PWA Status */}
					<Grid item md={8} xs={12}>
						<Card
							sx={{
								p: 3,
								height: '100%',
								background: 'rgba(255, 255, 255, 0.05)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
							}}
						>
							<Typography sx={{ mb: 3 }} variant="h6">
								PWA Status
							</Typography>
							<Grid spacing={2} container>
								{[
									{
										label: 'Service Worker',
										status: 'Active',
										color: '#2ecc71',
										icon: <Code sx={{ fontSize: 20 }} />,
										description: 'Background sync enabled',
									},
									{
										label: 'Push API',
										status: 'Configured',
										color: '#2ecc71',
										icon: <Notifications sx={{ fontSize: 20 }} />,
										description: 'VAPID keys set up',
									},
									{
										label: 'Cache Storage',
										status: 'Optimized',
										color: '#2ecc71',
										icon: <Storage sx={{ fontSize: 20 }} />,
										description: 'Using network-first strategy',
									},
									{
										label: 'Offline Mode',
										status: 'Ready',
										color: '#2ecc71',
										icon: <Speed sx={{ fontSize: 20 }} />,
										description: 'App shell cached',
									},
								].map((item, index) => (
									<Grid item key={index} sm={6} xs={12}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												p: 2,
												borderRadius: 1,
												bgcolor: 'rgba(255, 255, 255, 0.03)',
												border: '1px solid rgba(255, 255, 255, 0.06)',
											}}
										>
											<Box sx={{ mr: 2 }}>{item.icon}</Box>
											<Box>
												<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
													<Typography>{item.label}</Typography>
													<Chip
														sx={{
															bgcolor: `${item.color}20`,
															color: item.color,
															border: `1px solid ${item.color}40`,
														}}
														label={item.status}
														size="small"
													/>
												</Box>
												<Typography variant="caption" color="text.secondary">
													{item.description}
												</Typography>
											</Box>
										</Box>
									</Grid>
								))}
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default DashboardPage;
