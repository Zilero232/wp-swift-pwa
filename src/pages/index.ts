import { lazy } from 'react';

export const DashboardPage = lazy(async () => import('./dashboard-page'));
export const LicensePage = lazy(async () => import('./license-page'));
export const ManifestPage = lazy(async () => import('./manifest-page'));
export const NotificationsPage = lazy(async () => import('./notifications-page'));
export const CachePage = lazy(async () => import('./cache-page'));
export const ServiceWorkerPage = lazy(async () => import('./service-worker-page'));
export const AnalyticsPage = lazy(async () => import('./analytics-page'));
