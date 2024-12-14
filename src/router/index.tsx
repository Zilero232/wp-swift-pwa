import { useEffect, useState } from 'react';

import { ROUTES_ENUM } from '@/constants/modules/routes';

import { MainLayout } from '../layout/main-layout';
import { SettingsPage } from '../pages/settings-page';

// Defining the type for pages.
export type PageKey = keyof typeof pages;

const pages = {
	[ROUTES_ENUM.Home]: SettingsPage,
	[ROUTES_ENUM.Settings]: SettingsPage,
	[ROUTES_ENUM.Help]: SettingsPage,
};

const Router = () => {
	const [currentPage, setCurrentPage] = useState<PageKey>(ROUTES_ENUM.Home);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const page = (urlParams.get('page') as PageKey) || ROUTES_ENUM.Home;

		setCurrentPage(page);
	}, []);

	const PageComponent = pages[currentPage] || SettingsPage;

	return (
		<MainLayout>
			<PageComponent />
		</MainLayout>
	);
};

export default Router;
