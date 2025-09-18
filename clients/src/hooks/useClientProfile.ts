import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { User } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const authService = new AuthService(apiClient);

export const useClientProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['client-profile'],
    queryFn: () => authService.getCurrentUser(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<User>) => authService.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
  });

  return {
    profile,
    isLoading,
    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
  };
};