import { Extension, Rocket, Speed, Support } from '@mui/icons-material';

import type { Feature, Statistic } from '@/types/modules/license';

export const LICENSE_FEATURES: Feature[] = [
	{
		icon: <Speed />,
		title: 'Максимальная скорость',
		description: 'Ускорение работы PWA до 300%',
		color: '#FF6B6B',
	},
	{
		icon: <Extension />,
		title: 'Премиум функции',
		description: 'Расширенные возможности для вашего сайта',
		color: '#4ECDC4',
	},
	{
		icon: <Support />,
		title: 'Приоритетная поддержка',
		description: 'Персональная помощь в течение 24 часов',
		color: '#45B7D1',
	},
	{
		icon: <Rocket />,
		title: 'Будущие обновления',
		description: 'Ранний доступ к новым функциям',
		color: '#96CEB4',
	},
];

export const LICENSE_STATISTICS: Statistic[] = [
	{ title: '1000+', subtitle: 'Активных клиентов' },
	{ title: '24/7', subtitle: 'Техническая поддержка' },
	{ title: '99.9%', subtitle: 'Удовлетворенность' },
];

export const AVAILABLE_FEATURES: string[] = [
	'Оптимизация производительности PWA',
	'Расширенная настройка кэширования',
	'Кастомизация оффлайн-режима',
	'Аналитика и статистика',
	'Приоритетная поддержка',
];
