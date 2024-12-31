import { LockOpen, VpnKey } from '@mui/icons-material';
import { Box, Button, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

import { float, pulse } from './animation';
import { ActionButtons } from './ui/actions-buttons';
import { ActivationHistory } from './ui/activation-history';
import { FeatureCards } from './ui/feature-cards';
import { HeaderInfo } from './ui/header-info';
import { LicenseForm } from './ui/license-form';
import { LicenseInfo } from './ui/license-info';
import { PlansComparison } from './ui/plans-comparison';
import { QuestionsList } from './ui/question-list';
import { Statistics } from './ui/statistics';

const LicensePage = () => {
	const [showPlansModal, setShowPlansModal] = useState(false);
	const [showHistory, setShowHistory] = useState(false);

	const isLicenseActive = true;

	return (
		<Box sx={{ position: 'relative', overflow: 'hidden', py: 4 }}>
			<HeaderInfo />

			<Grid spacing={3} sx={{ position: 'relative', zIndex: 1 }} container>
				<Grid size={{ xs: 12, md: 8 }}>
					<Card
						sx={{
							height: '100%',
							background: isLicenseActive ? 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' : 'white',
							color: isLicenseActive ? 'white' : 'inherit',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<ActionButtons
							isLicenseActive={isLicenseActive}
							onHistoryClick={() => setShowHistory(true)}
							onPlansClick={() => setShowPlansModal(true)}
						/>

						<CardContent sx={{ p: 4, position: 'relative' }}>
							<Box sx={{ maxWidth: 500, mx: 'auto' }}>
								<Box
									sx={{
										textAlign: 'center',
										mb: 4,
										animation: `${float} 6s ease-in-out infinite`,
									}}
								>
									{isLicenseActive && (
										<LockOpen
											sx={{
												fontSize: 80,
												color: 'inherit',
												mb: 2,
												animation: `${pulse} 2s infinite`,
											}}
										/>
									)}

									{!isLicenseActive && (
										<VpnKey
											sx={{
												fontSize: 80,
												color: 'primary.main',
												mb: 2,
												animation: `${float} 4s ease-in-out infinite`,
											}}
										/>
									)}
								</Box>

								{!isLicenseActive && <LicenseForm />}

								{isLicenseActive && <LicenseInfo />}
							</Box>
						</CardContent>
					</Card>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<FeatureCards />

						{!isLicenseActive && (
							<Button
								sx={{
									mt: 2,
									background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
									animation: `${pulse} 2s infinite`,
									'&:hover': {
										background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
										transform: 'scale(1.05)',
									},
								}}
								size="large"
								variant="contained"
							>
								Получить лицензию
							</Button>
						)}
					</Box>
				</Grid>
			</Grid>

			<Box sx={{ mt: 6 }}>
				<QuestionsList />
			</Box>

			<Box sx={{ mt: 6, textAlign: 'center' }}>
				<Statistics />
			</Box>

			<PlansComparison setShowPlansModal={setShowPlansModal} showPlansModal={showPlansModal} />
			<ActivationHistory setShowHistoryModal={setShowHistory} showHistoryModal={showHistory} />
		</Box>
	);
};

export default LicensePage;
