import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import all partner pages (using dynamic imports for created components)
import { HomePage } from '../../apps/partners/src/pages/HomePage';
import { PartnerLayout } from '../../apps/partners/src/components/PartnerLayout';

// Lazy load heavy components
const DashboardPage = React.lazy(() => import('../../apps/partners/src/pages/DashboardPage'));
const CommissionsPage = React.lazy(() => import('../../apps/partners/src/pages/CommissionsPage'));
const ProgramPage = React.lazy(() => import('../../apps/partners/src/pages/ProgramPage'));
const ProfilePage = React.lazy(() => import('../../apps/partners/src/pages/ProfilePage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const PartnersApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<PartnerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="commissions" element={<CommissionsPage />} />
            <Route path="program" element={<ProgramPage />} />
            <Route path="referrals" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<ProfilePage />} />
          </Route>
        </Routes>
      </React.Suspense>
    </QueryClientProvider>
  );
};

export default PartnersApp;