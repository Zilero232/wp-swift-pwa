import { Box, Paper } from '@mui/material';

const PRESET_COLORS = ['#000000', '#ffffff', '#2271b1', '#135e96', '#f0f0f1', '#f0f0f1'];

interface PresetColorsProps {
	value: string;
	onChange: (color: string) => void;
}

const PresetColors = ({ value, onChange }: PresetColorsProps) => {
	return (
		<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
			{PRESET_COLORS.map(color => (
				<Paper
					key={color}
					sx={{
						width: 30,
						height: 30,
						backgroundColor: color,
						cursor: 'pointer',
						border: value === color ? '2px solid' : '1px solid',
						borderColor: value === color ? 'primary.main' : 'divider',
						borderRadius: 0.5,
						'&:hover': {
							transform: 'scale(1.1)',
						},
						transition: 'transform 0.2s ease',
					}}
					onClick={() => onChange(color)}
				/>
			))}
		</Box>
	);
};

export default PresetColors;
