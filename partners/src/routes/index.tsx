import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Shared components from monorepo
import { AppShell, LoadingSpinner, ErrorFallback } from '@shared/ui';

// Lazy-loaded partner-specific components for optimal bundle splitting
const PartnerDashboard = lazy(() => import('../pages/Dashboard'));
const PartnerReferrals = lazy(() => import('../pages/Referrals'));
const PartnerCommissions = lazy(() => import('../pages/Commissions'));
const PartnerClients = lazy(() => import('../pages/Clients'));
const PartnerProfile = lazy(() => import('../pages/Profile'));
const PartnerSettings = lazy(() => import('../pages/Settings'));

// Partner app layout wrapper
const PartnerLayout = () => {
  return (
    <AppShell appType="partner">
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
};

// Partner-specific routing configuration
export const partnerRouter = createBrowserRouter([
  {
    path: "/partners",
    element: <PartnerLayout />,
    children: [
      {
        index: true,
        element: <PartnerDashboard />,
      },
      {
        path: "dashboard",
        element: <PartnerDashboard />,
      },
      {
        path: "referrals",
        element: <PartnerReferrals />,
      },
      {
        path: "referrals/:referralId",
        element: <PartnerReferrals />,
      },
      {
        path: "commissions",
        element: <PartnerCommissions />,
      },
      {
        path: "clients",
        element: <PartnerClients />,
      },
      {
        path: "clients/:clientId",
        element: <PartnerClients />,
      },
      {
        path: "profile",
        element: <PartnerProfile />,
      },
      {
        path: "settings",
        element: <PartnerSettings />,
      },
    ],
  },
], {
  basename: "/partners"
});

// Router Provider Component
export const PartnerRouter = () => {
  return <RouterProvider router={partnerRouter} />;
};