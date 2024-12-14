import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';

interface IconUploaderProps {
	icons: Array<{ src: string; sizes: string }>;
	onChange: (icons: Array<{ src: string; sizes: string }>) => void;
}

const IconUploader: React.FC<IconUploaderProps> = ({ icons, onChange }) => {
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			// Здесь можно добавить обработку загрузки файла
			const reader = new FileReader();

			reader.onload = e => {
				const newIcon = {
					src: e.target?.result as string,
					sizes: '192x192', // Можно определять размер автоматически
				};

				onChange([...icons, newIcon]);
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<Box>
			<Typography variant="subtitle1" gutterBottom>
				Иконки приложения
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
				{icons.map((icon, index) => (
					<Box
						key={index}
						sx={{
							position: 'relative',
							width: 80,
							height: 80,
							border: '1px solid',
							borderColor: 'divider',
							borderRadius: 1,
							overflow: 'hidden',
						}}
					>
						<img
							alt={`Icon ${index + 1}`}
							src={icon.src}
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>

						<IconButton
							size="small"
							sx={{ position: 'absolute', top: 4, right: 4 }}
							onClick={() => onChange(icons.filter((_, i) => i !== index))}
						>
							<Delete />
						</IconButton>
					</Box>
				))}

				<Button sx={{ width: 80, height: 80 }} variant="outlined" component="label" startIcon={<Add />}>
					Добавить
					<input hidden accept="image/*" type="file" onChange={handleFileUpload} />
				</Button>
			</Box>
		</Box>
	);
};

export default IconUploader;
