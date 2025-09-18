import React from 'react';
import { Hero, DashboardStats, ProjectCard } from '@siso-public/shared-ui';
import { useClientData } from '../hooks/useClientData';

export const HomePage: React.FC = () => {
  const { projects, stats, isLoading } = useClientData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Hero
        title="Welcome to Your Client Dashboard"
        subtitle="Manage your projects, track progress, and collaborate with SISO"
        variant="client"
      />
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="client"
          />
        ))}
      </div>
    </div>
  );
};