import { MenuItem, TextField } from '@mui/material';

import ColorPickerField from '@/components/form/color-picker';
import IconUploaderField from '@/components/form/icon-uploader';
import RelatedApplicationsField from '@/components/form/related-applications';
import SwitchField from '@/components/form/switch-field';
import { type FieldConfig, FieldTypeEnum } from '@/types/modules/form-generator';

interface FormFieldProps {
	field: FieldConfig;
	value?: unknown;
	onBlur?: (name: string) => void;
	onChange?: (name: string, value: unknown) => void;
}

export const FormField = ({ field, value, onChange, onBlur }: FormFieldProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(field.name, event.target.value);
	};

	const handleBlur = () => {
		onBlur?.(field.name);
	};

	const renderField = () => {
		switch (field.type) {
			case FieldTypeEnum.Textarea:
				return (
					<TextField
						fullWidth
						multiline
						disabled={field.disabled}
						helperText={field.helperText}
						label={field.label}
						name={field.name}
						required={field.required}
						value={value || ''}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder={field.placeholder}
						rows={field.rows || 4}
					/>
				);

			case FieldTypeEnum.Select:
				return (
					<TextField
						fullWidth
						select
						disabled={field.disabled}
						helperText={field.helperText}
						label={field.label}
						name={field.name}
						required={field.required}
						value={value || ''}
						onBlur={handleBlur}
						onChange={handleChange}
					>
						{field.options.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				);

			case FieldTypeEnum.Color:
				return <ColorPickerField label={field.label} value={value as string} {...field} />;

			case FieldTypeEnum.Icon:
				return <IconUploaderField {...field} onChange={handleChange} />;

			case FieldTypeEnum.Switch:
				return <SwitchField {...field} onChange={handleChange} />;

			case FieldTypeEnum.RelatedApplications:
				return (
					<RelatedApplicationsField value={value as { platform: string; url: string }[]} onChange={handleChange} />
				);

			default:
				return (
					<TextField
						fullWidth
						disabled={field.disabled}
						helperText={field.helperText}
						label={field.label}
						name={field.name}
						required={field.required}
						type={field.type || 'text'}
						value={value || ''}
						onBlur={handleBlur}
						onChange={handleChange}
						placeholder={field.placeholder}
					/>
				);
		}
	};

	return <>{renderField()}</>;
};
