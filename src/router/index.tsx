import { Box, CircularProgress } from '@mui/material';
import { Suspense, useEffect } from 'react';

import { MainLayout } from '@/layout/main-layout';
import {
	AnalyticsPage,
	CachePage,
	DashboardPage,
	LicensePage,
	ManifestPage,
	NotificationsPage,
	ServiceWorkerPage,
} from '@/pages/index';
import { useStore } from '@/store/index';
import { ROUTES_ENUM } from '@/types/modules/navigations';

const LoadingFallback = () => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
		}}
	>
		<CircularProgress />
	</Box>
);
const pages: Record<ROUTES_ENUM, () => JSX.Element> = {
	[ROUTES_ENUM.Dashboard]: () => <DashboardPage />,
	[ROUTES_ENUM.Manifest]: () => <ManifestPage />,
	[ROUTES_ENUM.ServiceWorker]: () => <ServiceWorkerPage />,
	[ROUTES_ENUM.Cache]: () => <CachePage />,
	[ROUTES_ENUM.Notifications]: () => <NotificationsPage />,
	[ROUTES_ENUM.Analytics]: () => <AnalyticsPage />,
	[ROUTES_ENUM.License]: () => <LicensePage />,
} as const;

const Router = () => {
	const {
		navigation: { currentPage },
		navigationActions: { setCurrentPage },
	} = useStore();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const page = (urlParams.get('page') as ROUTES_ENUM) || ROUTES_ENUM.Dashboard;

		setCurrentPage(page);
	}, []);

	const PageComponent = pages[currentPage] || DashboardPage;

	return (
		<MainLayout>
			<Suspense fallback={<LoadingFallback />}>
				<PageComponent />
			</Suspense>
		</MainLayout>
	);
};

export default Router;
