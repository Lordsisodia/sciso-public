import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo, Sidebar } from '@siso-public/shared-ui';
import { PartnerNavigation } from './PartnerNavigation';
import { PartnerHeader } from './PartnerHeader';

export const PartnerLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Sidebar className="bg-white/80 backdrop-blur-sm border-r border-purple-200">
        <div className="p-4">
          <Logo size="lg" showText />
        </div>
        <PartnerNavigation />
      </Sidebar>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <PartnerHeader />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};