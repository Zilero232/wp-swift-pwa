import { Check, Close } from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

interface Plan {
	id: string;
	name: string;
	period: string;
	price: number;
	features: Array<{
		name: string;
		included: boolean;
	}>;
}

const PLANS: Plan[] = [
	{
		id: 'basic',
		name: 'Базовый',
		price: 1990,
		period: 'месяц',
		features: [
			{ name: 'Основные функции', included: true },
			{ name: 'Техподдержка', included: true },
			{ name: 'Расширенная аналитика', included: false },
			{ name: 'API доступ', included: false },
		],
	},
	{
		id: 'pro',
		name: 'Профессиональный',
		price: 4990,
		period: 'месяц',
		features: [
			{ name: 'Основные функции', included: true },
			{ name: 'Техподдержка', included: true },
			{ name: 'Расширенная аналитика', included: true },
			{ name: 'API доступ', included: true },
		],
	},
];

export const PlansComparison = ({
	showPlansModal,
	setShowPlansModal,
}: {
	showPlansModal: boolean;
	setShowPlansModal: (value: boolean) => void;
}) => {
	return (
		<Dialog fullWidth maxWidth="md" onClose={() => setShowPlansModal(false)} open={showPlansModal}>
			<DialogTitle>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h5">История активаций</Typography>
					<IconButton onClick={() => setShowPlansModal(false)}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent>
				<Grid spacing={3} container>
					{PLANS.map(plan => (
						<Grid item key={plan.id} md={6} xs={12}>
							<Card sx={{ height: '100%' }}>
								<CardHeader
									sx={{ bgcolor: 'primary.main', color: 'white' }}
									title={plan.name}
									titleTypography={{ variant: 'h5', align: 'center' }}
								/>
								<CardContent>
									<Typography align="center" sx={{ mb: 2 }} variant="h4">
										{plan.price} ₽/{plan.period}
									</Typography>
									<List>
										{plan.features.map(feature => (
											<ListItem key={feature.name}>
												<ListItemIcon>
													{feature.included ? <Check color="success" /> : <Close color="error" />}
												</ListItemIcon>
												<ListItemText primary={feature.name} />
											</ListItem>
										))}
									</List>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</DialogContent>
		</Dialog>
	);
};
