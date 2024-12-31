import { Box, Button, Typography } from '@mui/material';

import type { Icon } from '@/types/modules/settings';

interface PreviewImageProps extends Omit<Icon, 'key'> {
	preview: string;
	onChange: (file: File) => void;
}

const PreviewImage = ({ size, purpose, description, preview, onChange }: PreviewImageProps) => {
	return (
		<Box>
			<img alt={`${size}x${size}`} src={preview} style={{ width: 96, height: 96, objectFit: 'contain' }} />

			<Typography display="block" variant="caption">
				{size}x{size} - {purpose}
			</Typography>

			<Typography variant="caption" color="textSecondary">
				{description}
			</Typography>

			<Button
				size="small"
				sx={{ mt: 1 }}
				onClick={() => {
					setPreview(null);

					onChange(null as any);
				}}
			>
				Remove
			</Button>
		</Box>
	);
};

export default PreviewImage;
