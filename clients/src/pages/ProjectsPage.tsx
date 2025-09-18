import React, { useState } from 'react';
import { ProjectGrid, ProjectFilters, CreateProjectButton } from '@siso-public/shared-ui';
import { useClientProjects } from '../hooks/useClientProjects';
import { ProjectStatus } from '@siso-public/shared-types';

export const ProjectsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { projects, isLoading, createProject } = useClientProjects({
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: searchQuery
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <CreateProjectButton onCreateProject={createProject} />
      </div>

      <ProjectFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <ProjectGrid projects={projects} variant="client" />
      )}
    </div>
  );
};