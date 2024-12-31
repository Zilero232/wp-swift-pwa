import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

import { QUESTIONS_LIST } from '@/config/questions-list';

export const QuestionsList = () => {
	return (
		<>
			<Typography sx={{ mb: 2 }} variant="h5">
				Часто задаваемые вопросы
			</Typography>

			{QUESTIONS_LIST.map((item, index) => (
				<Accordion key={index}>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography>{item.question}</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<Typography color="text.secondary">{item.answer}</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};
