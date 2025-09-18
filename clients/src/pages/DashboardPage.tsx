import React from 'react';
import { DashboardGrid, ActivityFeed, ProjectTimeline } from '@siso-public/shared-ui';
import { useClientAnalytics } from '../hooks/useClientAnalytics';

export const DashboardPage: React.FC = () => {
  const { analytics, activities, timeline, isLoading } = useClientAnalytics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <DashboardGrid metrics={analytics} variant="client" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed activities={activities} />
            <ProjectTimeline timeline={timeline} />
          </div>
        </>
      )}
    </div>
  );
};