import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@siso-public/shared-config';
import { Logo, Footer } from '@siso-public/shared-ui';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Lazy load apps for optimal code splitting
const ClientsApp = React.lazy(() => import('./apps/ClientsApp'));
const PartnersApp = React.lazy(() => import('./apps/PartnersApp'));

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <React.Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <Logo size="xl" className="mx-auto mb-4" />
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          }
        >
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Client portal routes */}
            <Route path="/clients/*" element={<ClientsApp />} />
            
            {/* Partner portal routes */}
            <Route path="/partners/*" element={<PartnersApp />} />
            
            {/* Legacy redirects */}
            <Route path="/client/*" element={<Navigate to="/clients" replace />} />
            <Route path="/partner/*" element={<Navigate to="/partners" replace />} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
        
        <Footer />
      </div>
    </AppProvider>
  );
};