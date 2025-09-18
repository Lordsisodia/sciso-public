import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Shared components from monorepo
import { AppShell, LoadingSpinner, ErrorFallback } from '@shared/ui';

// Lazy-loaded client-specific components for optimal bundle splitting
const ClientDashboard = lazy(() => import('../pages/Dashboard'));
const ClientProjects = lazy(() => import('../pages/Projects'));
const ClientAutomation = lazy(() => import('../pages/Automation'));
const ClientProfile = lazy(() => import('../pages/Profile'));
const ClientSettings = lazy(() => import('../pages/Settings'));

// Client app layout wrapper
const ClientLayout = () => {
  return (
    <AppShell appType="client">
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
};

// Client-specific routing configuration
export const clientRouter = createBrowserRouter([
  {
    path: "/clients",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ClientDashboard />,
      },
      {
        path: "dashboard",
        element: <ClientDashboard />,
      },
      {
        path: "projects",
        element: <ClientProjects />,
      },
      {
        path: "projects/:projectId",
        element: <ClientProjects />,
      },
      {
        path: "automation",
        element: <ClientAutomation />,
      },
      {
        path: "automation/:automationId",
        element: <ClientAutomation />,
      },
      {
        path: "profile",
        element: <ClientProfile />,
      },
      {
        path: "settings",
        element: <ClientSettings />,
      },
    ],
  },
], {
  basename: "/clients"
});

// Router Provider Component
export const ClientRouter = () => {
  return <RouterProvider router={clientRouter} />;
};