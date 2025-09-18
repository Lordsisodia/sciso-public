import { useQuery } from '@tanstack/react-query';
import { ClientService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { Client, ClientProject } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const clientService = new ClientService(apiClient);

export const useClientData = () => {
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['client-projects'],
    queryFn: () => clientService.getClients({ limit: 6 }),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['client-stats'],
    queryFn: () => clientService.getClientAnalytics('current-user', '30d'),
  });

  return {
    projects: projects?.clients || [],
    stats: stats || {},
    isLoading: projectsLoading || statsLoading,
  };
};