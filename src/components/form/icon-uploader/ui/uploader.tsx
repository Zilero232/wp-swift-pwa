import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import type { Icon } from '@/types/modules/settings';

import { useNotification } from '@/hooks/useNotification';
import { NotificationSeverity } from '@/types/modules/notification';

interface UploaderFieldProps extends Omit<Icon, 'key'> {
	error?: string;
	onChange: (file: File) => void;
}

const UploaderField = ({ size, description, error, onChange }: UploaderFieldProps) => {
	const { showNotification } = useNotification();

	const handleFileUpload = (file: File) => {
		try {
			onChange(file);

			showNotification({ message: 'Файл успешно загружен', severity: NotificationSeverity.SUCCESS });
		} catch (error) {
			showNotification({ message: 'Ошибка при загрузке файла', severity: NotificationSeverity.ERROR });
		}
	};

	return (
		<Box>
			<Button variant="outlined" color={error ? 'error' : 'primary'} component="label" startIcon={<CloudUpload />}>
				<span>
					Upload {size}x{size}
				</span>

				<input
					hidden
					accept="image/png"
					type="file"
					onChange={e => {
						const file = e.target.files?.[0];

						if (file) {
							handleFileUpload(file);
						}
					}}
				/>
			</Button>

			{description && (
				<Typography display="block" sx={{ mt: 1 }} variant="caption">
					{description}
				</Typography>
			)}
		</Box>
	);
};

export default UploaderField;
