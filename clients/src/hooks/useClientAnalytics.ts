import { useQuery } from '@tanstack/react-query';
import { ClientService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const clientService = new ClientService(apiClient);

export const useClientAnalytics = () => {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['client-analytics'],
    queryFn: () => clientService.getClientAnalytics('current-user', '30d'),
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['client-activities'],
    queryFn: () => fetchClientActivities(),
  });

  const { data: timeline, isLoading: timelineLoading } = useQuery({
    queryKey: ['client-timeline'],
    queryFn: () => fetchClientTimeline(),
  });

  return {
    analytics: analytics || {},
    activities: activities || [],
    timeline: timeline || [],
    isLoading: analyticsLoading || activitiesLoading || timelineLoading,
  };
};

// Mock functions - replace with actual API calls
const fetchClientActivities = async () => {
  return [
    { id: '1', type: 'project_update', message: 'Project Alpha updated', timestamp: new Date() },
    { id: '2', type: 'milestone', message: 'Milestone completed', timestamp: new Date() },
  ];
};

const fetchClientTimeline = async () => {
  return [
    { id: '1', title: 'Project Kickoff', date: new Date(), status: 'completed' },
    { id: '2', title: 'Design Phase', date: new Date(), status: 'in_progress' },
  ];
};