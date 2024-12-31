import Grid from '@mui/material/Grid2';

import type { SectionConfig } from '@/types/modules/form-generator';

import { SettingsCard } from '@/components/settings-card';

const BasicSettings = ({ section }: { section: SectionConfig }) => {
	return (
		<SettingsCard
			header={{
				title: section.title,
				helpText: section.helpText,
				icon: section.icon ? <section.icon /> : undefined,
				category: section.category,
			}}
		>
			<Grid spacing={spacing} container>
				<Grid size={12}>
					<FormField field={field.field} onChange={onChange} />
				</Grid>
			</Grid>
		</SettingsCard>
	);
};

export default BasicSettings;
