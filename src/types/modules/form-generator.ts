import type { SvgIconComponent } from '@mui/icons-material';
import type { GridBaseProps } from '@mui/material/Grid2';

import type { Icon } from './settings';

export enum FieldTypeEnum {
	Color = 'color',
	Email = 'email',
	Icon = 'icon',
	Select = 'select',
	Text = 'text',
	Textarea = 'textarea',
	RelatedApplications = 'related-applications',
	Switch = 'switch',
}

export interface SectionConfig {
	fields: FieldConfig[];
	card?: {
		header?: {
			rightContent?: React.ReactNode;
		};
	};
	section: {
		category?: string;
		helpText?: string;
		icon?: SvgIconComponent;
		id: string;
		title: string;
	};
}

export interface BaseFieldConfig {
	field: {
		disabled?: boolean;
		helperText?: string;
		label: string;
		name?: string;
		required?: boolean;
	};
	style?: {
		gridProps?: GridBaseProps['size'];
	};
}

export interface TextFieldConfig extends BaseFieldConfig {
	field: {
		defaultValue?: number | string;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		placeholder?: string;
		type?: FieldTypeEnum.Email | FieldTypeEnum.Text;
	} & BaseFieldConfig['field'];
}

export interface TextAreaConfig extends BaseFieldConfig {
	field: {
		defaultValue?: string;
		maxLength?: number;
		placeholder?: string;
		rows?: number;
		type: FieldTypeEnum.Textarea;
	} & BaseFieldConfig['field'];
}

export interface SelectFieldConfig extends BaseFieldConfig {
	field: {
		defaultValue?: number | string;
		multiple?: boolean;
		options: Array<{ label: string; value: number | string }>;
		type: FieldTypeEnum.Select;
	} & BaseFieldConfig['field'];
}

export interface ColorFieldConfig extends BaseFieldConfig {
	field: {
		defaultValue?: string;
		type: FieldTypeEnum.Color;
	} & BaseFieldConfig['field'];
}

export interface IconFieldConfig extends BaseFieldConfig {
	field: {
		type: FieldTypeEnum.Icon;
	} & BaseFieldConfig['field'];
}

export interface SwitchFieldConfig extends BaseFieldConfig {
	field: {
		defaultValue?: boolean;
		type: FieldTypeEnum.Switch;
	} & BaseFieldConfig['field'];
}

export interface RelatedApplicationsFieldConfig extends BaseFieldConfig {
	field: {
		type: FieldTypeEnum.RelatedApplications;
	} & BaseFieldConfig['field'];
}

export type FieldConfig =
	| ColorFieldConfig
	| IconFieldConfig
	| RelatedApplicationsFieldConfig
	| SelectFieldConfig
	| SwitchFieldConfig
	| TextAreaConfig
	| TextFieldConfig;
