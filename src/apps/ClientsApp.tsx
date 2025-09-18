import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import all client pages
import { HomePage } from '../../apps/clients/src/pages/HomePage';
import { DashboardPage } from '../../apps/clients/src/pages/DashboardPage';
import { ProjectsPage } from '../../apps/clients/src/pages/ProjectsPage';
import { ProfilePage } from '../../apps/clients/src/pages/ProfilePage';
import { ClientLayout } from '../../apps/clients/src/components/ClientLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const ClientsApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="analytics" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<ProfilePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default ClientsApp;