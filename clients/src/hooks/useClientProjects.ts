import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { ClientProject, ProjectStatus } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const clientService = new ClientService(apiClient);

interface UseClientProjectsOptions {
  status?: ProjectStatus;
  search?: string;
}

export const useClientProjects = (options: UseClientProjectsOptions = {}) => {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['client-projects', options],
    queryFn: () => clientService.getClientProjects('current-user'),
  });

  const createProjectMutation = useMutation({
    mutationFn: (projectData: Omit<ClientProject, 'id' | 'clientId' | 'createdAt' | 'updatedAt'>) =>
      clientService.createClientProject('current-user', projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-projects'] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ClientProject> }) =>
      clientService.updateClient(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-projects'] });
    },
  });

  return {
    projects: projects || [],
    isLoading,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
  };
};