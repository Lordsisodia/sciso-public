import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PartnerService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { PartnerProfile, UpdatePartnerProfileData } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const partnerService = new PartnerService(apiClient);

export const usePartnerProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['partner-profile'],
    queryFn: () => partnerService.getPartnerProfile('current-user'),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdatePartnerProfileData) => 
      partnerService.updatePartnerProfile('current-user', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-profile'] });
      queryClient.invalidateQueries({ queryKey: ['partner-stats'] });
    },
  });

  const { data: tierProgress } = useQuery({
    queryKey: ['partner-tier-progress'],
    queryFn: () => partnerService.getTierProgress('current-user'),
    enabled: !!profile,
  });

  // Mock data for development (remove when backend is ready)
  const mockProfile: PartnerProfile = {
    id: 'current-user',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Digital Marketing Solutions',
    website: 'https://dmsolutions.com',
    address: '123 Business Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'US',
    bio: 'Experienced digital marketing consultant specializing in e-commerce and SaaS growth strategies. I help businesses scale through data-driven marketing campaigns and strategic partnerships.',
    specialties: ['Digital Marketing', 'E-commerce', 'SaaS Growth', 'Lead Generation'],
    tier: 'Silver',
    totalReferrals: 18,
    totalEarnings: 15750,
    joinDate: '2023-08-15',
    paymentMethod: 'bank-transfer',
    bankAccount: '****1234',
    routingNumber: '123456789',
    taxId: '12-3456789',
    notifications: {
      commissions: true,
      marketing: false,
      updates: true
    },
    status: 'active'
  };

  const mockTierProgress = {
    currentTier: 'Silver',
    nextTier: 'Gold',
    progress: 72,
    requirements: {
      referralsNeeded: 7,
      totalReferralsRequired: 25,
      currentReferrals: 18
    }
  };

  const updateProfile = async (data: UpdatePartnerProfileData) => {
    try {
      await updateProfileMutation.mutateAsync(data);
      return { success: true };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return { success: false, error };
    }
  };

  return {
    profile: profile || mockProfile,
    tierProgress: tierProgress || mockTierProgress,
    updateProfile,
    isLoading,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
};