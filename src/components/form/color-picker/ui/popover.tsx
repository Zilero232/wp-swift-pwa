import { Paper, Popover } from '@mui/material';

import PresetColors from './preset-colors';

interface ColorPickerPopoverProps {
	anchorEl: HTMLElement | null;
	open: boolean;
	value: string;
	onChange: (color: string) => void;
	onClose: () => void;
}

const ColorPickerPopover = ({ open, anchorEl, onClose, value, onChange }: ColorPickerPopoverProps) => {
	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			onClose={onClose}
			open={open}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
		>
			<Paper
				sx={{
					p: 2,
					width: 300,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
				elevation={3}
			>
				<input
					style={{
						width: '100%',
						height: 40,
						padding: 0,
						border: 'none',
						cursor: 'pointer',
					}}
					type="color"
					value={value}
					onChange={e => onChange(e.target.value)}
				/>

				<PresetColors value={value} onChange={onChange} />
			</Paper>
		</Popover>
	);
};

export default ColorPickerPopover;
