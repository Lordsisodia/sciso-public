import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo, Sidebar } from '@siso-public/shared-ui';
import { ClientNavigation } from './ClientNavigation';

export const ClientLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar>
        <div className="p-4">
          <Logo size="lg" showText />
        </div>
        <ClientNavigation />
      </Sidebar>
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};