import { AccessTime, CheckCircle, Close, Error } from '@mui/icons-material';
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { useState } from 'react';

export interface ActivationRecord {
	date: Date;
	device?: string;
	id: string;
	key: string;
	status: 'failed' | 'success';
}

interface ActivationHistoryProps {
	showHistoryModal: boolean;
	setShowHistoryModal: (value: boolean) => void;
}

export const ActivationHistory = ({ setShowHistoryModal, showHistoryModal }: ActivationHistoryProps) => {
	const [activationHistory, setActivationHistory] = useState<ActivationRecord[]>([
		{
			id: '1',
			date: new Date(),
			status: 'success',
			key: 'XXXX-XXXX-XXXX',
			device: 'Основной компьютер',
		},
	]);

	return (
		<Dialog fullWidth maxWidth="md" onClose={() => setShowHistoryModal(false)} open={showHistoryModal}>
			<DialogTitle>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h5">История активаций</Typography>

					<IconButton onClick={() => setShowHistoryModal(false)}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent>
				<List>
					{activationHistory.map(record => (
						<ListItem key={record.id}>
							<ListItemIcon>
								{record.status === 'success' ? <CheckCircle color="success" /> : <Error color="error" />}
							</ListItemIcon>

							<ListItemText
								primary={`Ключ: ${record.key}`}
								secondary={
									<>
										<AccessTime sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
										{new Date(record.date).toLocaleString('ru')}
										{record.device && ` • Устройство: ${record.device}`}
									</>
								}
							/>
						</ListItem>
					))}
				</List>
			</DialogContent>
		</Dialog>
	);
};
