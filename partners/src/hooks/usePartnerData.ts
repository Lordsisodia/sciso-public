import { useQuery } from '@tanstack/react-query';
import { PartnerService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { Partner, PartnerStats, PartnerActivity } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const partnerService = new PartnerService(apiClient);

export const usePartnerData = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['partner-stats'],
    queryFn: () => partnerService.getPartnerStats('current-user'),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: recentCommissions, isLoading: commissionsLoading } = useQuery({
    queryKey: ['recent-commissions'],
    queryFn: () => partnerService.getRecentCommissions('current-user', { limit: 5 }),
    refetchInterval: 60000, // Refetch every minute
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['partner-activity'],
    queryFn: () => partnerService.getPartnerActivity('current-user', { limit: 10 }),
    refetchInterval: 60000,
  });

  // Mock data for development (remove when backend is ready)
  const mockStats: PartnerStats = {
    totalEarnings: 15750,
    totalReferrals: 23,
    activeReferrals: 18,
    conversionRate: 68.5,
    tier: 'Silver',
    nextTierProgress: 72,
    thisMonthEarnings: 2850,
    pendingEarnings: 1250
  };

  const mockRecentCommissions = [
    {
      id: '1',
      clientName: 'TechStart Inc.',
      amount: 750,
      date: '2024-03-10',
      projectType: 'E-commerce Development',
      status: 'paid' as const
    },
    {
      id: '2',
      clientName: 'Digital Dynamics',
      amount: 500,
      date: '2024-03-08',
      projectType: 'Website Redesign',
      status: 'pending' as const
    },
    {
      id: '3',
      clientName: 'Innovation Labs',
      amount: 920,
      date: '2024-03-05',
      projectType: 'Mobile App',
      status: 'paid' as const
    },
    {
      id: '4',
      clientName: 'Global Solutions',
      amount: 680,
      date: '2024-03-02',
      projectType: 'Brand Strategy',
      status: 'paid' as const
    }
  ];

  const mockRecentActivity: PartnerActivity[] = [
    {
      id: '1',
      type: 'commission_earned',
      title: 'Commission Earned',
      description: 'Earned $750 from TechStart Inc. referral',
      timestamp: '2024-03-10T10:30:00Z',
      metadata: {
        amount: 750,
        clientName: 'TechStart Inc.'
      }
    },
    {
      id: '2',
      type: 'referral_converted',
      title: 'Referral Converted',
      description: 'Digital Dynamics signed up for premium plan',
      timestamp: '2024-03-08T14:15:00Z',
      metadata: {
        clientName: 'Digital Dynamics',
        plan: 'Premium'
      }
    },
    {
      id: '3',
      type: 'tier_progress',
      title: 'Tier Progress',
      description: 'You are 72% towards Gold tier',
      timestamp: '2024-03-07T09:00:00Z',
      metadata: {
        currentTier: 'Silver',
        nextTier: 'Gold',
        progress: 72
      }
    },
    {
      id: '4',
      type: 'referral_signup',
      title: 'New Referral',
      description: 'Innovation Labs signed up using your referral link',
      timestamp: '2024-03-05T16:45:00Z',
      metadata: {
        clientName: 'Innovation Labs'
      }
    }
  ];

  return {
    stats: stats || mockStats,
    recentCommissions: recentCommissions || mockRecentCommissions,
    recentActivity: recentActivity || mockRecentActivity,
    isLoading: statsLoading || commissionsLoading || activityLoading,
  };
};