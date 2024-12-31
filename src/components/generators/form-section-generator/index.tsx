import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import type { SectionConfig } from '@/types/modules/form-generator';

import { FormField } from '@/components/generators/form-generator';
import { SettingsCard } from '@/components/settings-card';

interface FormSectionsGeneratorProps {
	sections: SectionConfig[];
	spacing?: number;
	onChange?: (name: string, value: any) => void;
	onSave?: (sectionId: string, values: Record<string, any>) => void;
}

const FormSectionsGenerator = ({ sections, onChange, onSave, spacing = 3 }: FormSectionsGeneratorProps) => {
	const handleSave = (sectionId: string) => {
		const sectionValues = sections
			.find(section => section.id === sectionId)
			?.fields.reduce(
				(acc, field) => ({
					...acc,
					[field.name]: values[field.name],
				}),
				{},
			);
		onSave?.(sectionId, sectionValues || {});
	};

	return (
		<Box>
			{sections.map(({ section, fields }) => (
				<SettingsCard
					key={section.id}
					header={{
						title: section.title,
						helpText: section.helpText,
						icon: section.icon ? <section.icon /> : undefined,
						category: section.category,
					}}
					onSave={onSave ? () => handleSave(section.id) : undefined}
				>
					<Grid spacing={spacing} container>
						{fields?.map(({ field, style: { gridProps = {} } = {} }, index) => (
							<Grid key={index} size={gridProps}>
								<FormField field={field} onChange={onChange} />
							</Grid>
						))}
					</Grid>
				</SettingsCard>
			))}
		</Box>
	);
};

export default FormSectionsGenerator;
