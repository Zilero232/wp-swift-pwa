import { Box, FormControl, FormHelperText, InputLabel, Paper, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import ColorPickerPopover from './ui/popover';

interface ColorPickerProps {
	helperText?: string;
	label: string;
	value: string;
	onChange: (color: string) => void;
}

const ColorPicker = ({ label, value, onChange, helperText }: ColorPickerProps) => {
	const anchorEl = useRef<HTMLElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<FormControl fullWidth>
			<InputLabel shrink>{label}</InputLabel>

			<Box ref={anchorEl} sx={{ mt: 3 }}>
				<Box
					sx={{
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						p: 1,
						border: '1px solid',
						borderColor: 'divider',
						borderRadius: 1,
						'&:hover': {
							backgroundColor: 'action.hover',
						},
					}}
					onClick={handleClick}
				>
					<Paper
						sx={{
							width: 40,
							height: 40,
							backgroundColor: value,
							border: '2px solid',
							borderColor: 'divider',
							borderRadius: 1,
						}}
						elevation={0}
					/>

					<Typography>{value?.toUpperCase()}</Typography>
				</Box>

				{isOpen && (
					<ColorPickerPopover
						value={value}
						anchorEl={anchorEl.current}
						onChange={onChange}
						onClose={() => setIsOpen(false)}
						open={isOpen}
					/>
				)}
			</Box>

			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default ColorPicker;
