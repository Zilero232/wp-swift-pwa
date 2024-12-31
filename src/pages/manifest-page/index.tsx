import { Code, Image, Launch, Palette } from '@mui/icons-material';

import { ButtonSubmit } from '@/components/form/button-submit';
import FormSectionsGenerator from '@/components/generators/form-section-generator';
import { FieldTypeEnum, type SectionConfig } from '@/types/modules/form-generator';
import { DisplayModeEnum, IconPurposeEnum, IconSizeEnum, OrientationEnum } from '@/types/modules/settings';

export const manifestSections: SectionConfig[] = [
	{
		section: {
			id: 'basic',
			title: 'Basic Configuration',
			helpText: 'Basic information about your application',
			icon: Code,
			category: 'Technical',
		},
		fields: [
			{
				field: {
					name: 'name',
					label: 'App Name',
					placeholder: 'My Awesome PWA',
					required: true,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'shortName',
					label: 'Short Name',
					placeholder: 'MyPWA',
					required: true,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'description',
					label: 'Description',
					type: FieldTypeEnum.Textarea,
					placeholder: 'A brief description of your PWA',
					rows: 1,
				},
				style: {
					gridProps: { md: 12, xs: 12 },
				},
			},
			{
				field: {
					name: 'version',
					label: 'Version',
					placeholder: '1.0.0',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'lang',
					label: 'Language',
					placeholder: 'en-US',
					defaultValue: 'en-US',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
		],
	},
	{
		section: {
			id: 'display',
			title: 'Display Settings',
			helpText: 'Control how your app appears and behaves',
			icon: Palette,
			category: 'Appearance',
		},
		fields: [
			{
				field: {
					name: 'display',
					label: 'Display Mode',
					type: FieldTypeEnum.Select,
					defaultValue: DisplayModeEnum.Standalone,
					options: Object.values(DisplayModeEnum).map(mode => ({
						label: mode,
						value: mode,
					})),
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'orientation',
					label: 'Orientation',
					type: FieldTypeEnum.Select,
					defaultValue: OrientationEnum.Any,
					options: Object.values(OrientationEnum).map(orientation => ({
						label: orientation,
						value: orientation,
					})),
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'themeColor',
					label: 'Theme Color',
					type: FieldTypeEnum.Color,
					defaultValue: '#000000',
					helperText: 'The color of the toolbar and address bar on mobile devices',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'backgroundColor',
					label: 'Background Color',
					type: FieldTypeEnum.Color,
					defaultValue: '#ffffff',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
		],
	},
	{
		section: {
			id: 'start',
			title: 'Start Settings',
			helpText: 'Configure how your app starts',
			icon: Launch,
			category: 'Technical',
		},
		fields: [
			{
				field: {
					name: 'startPage',
					label: 'Start Page',
					type: FieldTypeEnum.Select,
					options: [],
				},
				style: {
					gridProps: { md: 4, xs: 12 },
				},
			},
			{
				field: {
					name: 'offlineStartPage',
					label: 'Offline Start Page',
					type: FieldTypeEnum.Select,
					options: [],
				},
				style: {
					gridProps: { md: 4, xs: 12 },
				},
			},
			{
				field: {
					name: 'scope',
					label: 'Scope',
					placeholder: '/',
				},
				style: {
					gridProps: { md: 4, xs: 12 },
				},
			},
		],
	},
	{
		section: {
			id: 'icons',
			title: 'Icons',
			helpText: 'App icons for different platforms and sizes',
			icon: Image,
			category: 'Assets',
		},
		fields: [
			{
				field: {
					name: 'standard',
					label: 'Standard Icon',
					type: FieldTypeEnum.Icon,
					required: true,
					size: IconSizeEnum.STANDARD,
					description: 'Стандартная иконка для устройств (192x192)',
					purpose: IconPurposeEnum.ANY,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'splash',
					label: 'Splash Icon',
					type: FieldTypeEnum.Icon,
					required: true,
					size: IconSizeEnum.SPLASH,
					description: 'Large icon for splash screen (512x512)',
					purpose: IconPurposeEnum.ANY,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
		],
	},
	{
		section: {
			id: 'related',
			title: 'Related Applications',
			helpText: 'Manage related applications and preferences',
			icon: Code,
			category: 'Technical',
		},
		card: {
			header: {
				rightContent: <div>123</div>,
			},
		},
		fields: [
			{
				field: {
					name: 'preferRelatedApplications',
					label: 'Prefer Related Applications',
					type: FieldTypeEnum.Switch,
					defaultValue: false,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'relatedApplications',
					label: 'Related Applications',
					type: FieldTypeEnum.RelatedApplications,
				},
				style: {
					gridProps: { md: 12, xs: 12 },
				},
			},
		],
	},
	{
		section: {
			id: 'advanced',
			title: 'Advanced Settings',
			helpText: 'Additional settings for your application',
			icon: Code,
			category: 'Technical',
		},
		fields: [
			{
				field: {
					name: 'categories',
					label: 'Categories',
					type: FieldTypeEnum.Select,
					options: [
						{ label: 'Utilities', value: 'utilities' },
						{ label: 'Productivity', value: 'productivity' },
						{ label: 'Games', value: 'games' },
						{ label: 'Social', value: 'social' },
					],
					multiple: true,
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'lang',
					label: 'Language',
					placeholder: 'en-US',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'dir',
					label: 'Text Direction',
					type: FieldTypeEnum.Select,
					options: [
						{ label: 'Left to Right', value: 'ltr' },
						{ label: 'Right to Left', value: 'rtl' },
						{ label: 'Auto', value: 'auto' },
					],
					defaultValue: 'ltr',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
			{
				field: {
					name: 'iarcRatingId',
					label: 'IARC Rating ID',
					placeholder: 'e10a',
				},
				style: {
					gridProps: { md: 6, xs: 12 },
				},
			},
		],
	},
];

const ManifestPage = () => {
	return (
		<>
			<FormSectionsGenerator sections={manifestSections} />

			<ButtonSubmit />
		</>
	);
};
export default ManifestPage;
