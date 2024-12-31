import { Box } from '@mui/material';
import { useState } from 'react';

import type { Icon } from '@/types/modules/settings';

import PreviewImage from './ui/preview-image';
import UploaderField from './ui/uploader';

interface IconUploaderProps extends Icon {
	error?: string;
	onChange: (file: File) => void;
}

const IconUploaderField = (props: IconUploaderProps) => {
	const [preview, setPreview] = useState<string | null>(null);

	const handleFileUpload = async (file: File) => {
		// Проверка размера изображения
		const img = new Image();

		img.src = URL.createObjectURL(file);

		await new Promise(resolve => {
			img.onload = () => {
				if (img.width !== size || img.height !== size) {
					alert(`Icon must be ${size}x${size} pixels`);

					return;
				}

				setPreview(URL.createObjectURL(file));
				onChange(file);
				resolve(true);
			};
		});
	};

	return (
		<Box
			sx={{
				border: '1px dashed',
				borderColor: props.error ? 'error.main' : 'divider',
				borderRadius: 1,
				p: 2,
				textAlign: 'center',
			}}
		>
			{preview && <PreviewImage preview={preview} {...props} />}

			{!preview && <UploaderField {...props} />}
		</Box>
	);
};

export default IconUploaderField;
