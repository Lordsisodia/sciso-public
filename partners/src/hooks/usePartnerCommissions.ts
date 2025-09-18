import { useQuery } from '@tanstack/react-query';
import { PartnerService, createApiClient, createDefaultConfig } from '@siso-public/shared-services';
import { Commission, CommissionFilters, MonthlyGoal } from '@siso-public/shared-types';

const apiClient = createApiClient(createDefaultConfig(
  import.meta.env.VITE_API_BASE_URL || 'https://api.siso.agency'
));
const partnerService = new PartnerService(apiClient);

interface UsePartnerCommissionsOptions {
  timeRange?: string;
  status?: string;
}

export const usePartnerCommissions = (options: UsePartnerCommissionsOptions = {}) => {
  const { timeRange = 'last-30-days', status = 'all' } = options;

  const filters: CommissionFilters = {
    timeRange,
    status: status !== 'all' ? status : undefined,
  };

  const { data: commissions, isLoading: commissionsLoading } = useQuery({
    queryKey: ['partner-commissions', filters],
    queryFn: () => partnerService.getCommissions('current-user', filters),
    refetchInterval: 30000,
  });

  const { data: commissionStats, isLoading: statsLoading } = useQuery({
    queryKey: ['commission-stats', timeRange],
    queryFn: () => partnerService.getCommissionStats('current-user', timeRange),
  });

  const { data: commissionTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['commission-trends'],
    queryFn: () => partnerService.getCommissionTrends('current-user'),
  });

  const { data: monthlyGoals, isLoading: goalsLoading } = useQuery({
    queryKey: ['monthly-goals'],
    queryFn: () => partnerService.getMonthlyGoals('current-user'),
  });

  // Mock data for development (remove when backend is ready)
  const mockCommissions: Commission[] = [
    {
      id: '1',
      clientName: 'TechStart Inc.',
      projectType: 'E-commerce Development',
      amount: 750,
      rate: 25,
      date: '2024-03-10',
      status: 'paid',
      paymentDate: '2024-03-15',
      referralDate: '2024-02-15',
      projectValue: 3000
    },
    {
      id: '2',
      clientName: 'Digital Dynamics',
      projectType: 'Website Redesign',
      amount: 500,
      rate: 20,
      date: '2024-03-08',
      status: 'pending',
      referralDate: '2024-02-20',
      projectValue: 2500
    },
    {
      id: '3',
      clientName: 'Innovation Labs',
      projectType: 'Mobile App Development',
      amount: 920,
      rate: 23,
      date: '2024-03-05',
      status: 'paid',
      paymentDate: '2024-03-10',
      referralDate: '2024-01-28',
      projectValue: 4000
    },
    {
      id: '4',
      clientName: 'Global Solutions',
      projectType: 'Brand Strategy',
      amount: 680,
      rate: 20,
      date: '2024-03-02',
      status: 'paid',
      paymentDate: '2024-03-07',
      referralDate: '2024-02-01',
      projectValue: 3400
    },
    {
      id: '5',
      clientName: 'StartupTech',
      projectType: 'MVP Development',
      amount: 450,
      rate: 18,
      date: '2024-02-28',
      status: 'pending',
      referralDate: '2024-01-15',
      projectValue: 2500
    },
    {
      id: '6',
      clientName: 'Enterprise Corp',
      projectType: 'Digital Transformation',
      amount: 1200,
      rate: 30,
      date: '2024-02-25',
      status: 'paid',
      paymentDate: '2024-03-01',
      referralDate: '2024-01-10',
      projectValue: 4000
    }
  ];

  const mockCommissionStats = {
    totalEarnings: 15750,
    pendingEarnings: 950,
    thisMonthEarnings: 2850,
    averageCommissionRate: 22.5,
    totalCommissions: 45,
    conversionRate: 68.5
  };

  const mockMonthlyGoals: MonthlyGoal[] = [
    {
      title: 'Monthly Referrals',
      current: 3,
      target: 5,
      progress: 60,
      unit: 'referrals'
    },
    {
      title: 'Commission Earnings',
      current: 2850,
      target: 3500,
      progress: 81,
      unit: 'dollars'
    },
    {
      title: 'Conversion Rate',
      current: 68.5,
      target: 75,
      progress: 91,
      unit: 'percentage'
    }
  ];

  // Filter mock data based on options
  let filteredCommissions = mockCommissions;
  
  if (status !== 'all') {
    filteredCommissions = filteredCommissions.filter(commission => commission.status === status);
  }

  // Simple time range filtering (in real app, this would be handled by backend)
  const now = new Date();
  const timeRangeDate = new Date();
  
  switch (timeRange) {
    case 'last-7-days':
      timeRangeDate.setDate(now.getDate() - 7);
      break;
    case 'last-30-days':
      timeRangeDate.setDate(now.getDate() - 30);
      break;
    case 'last-90-days':
      timeRangeDate.setDate(now.getDate() - 90);
      break;
    case 'this-year':
      timeRangeDate.setMonth(0, 1);
      break;
    default:
      timeRangeDate.setFullYear(2020); // All time
  }

  if (timeRange !== 'all-time') {
    filteredCommissions = filteredCommissions.filter(commission => 
      new Date(commission.date) >= timeRangeDate
    );
  }

  return {
    commissions: filteredCommissions,
    totalEarnings: mockCommissionStats.totalEarnings,
    pendingEarnings: mockCommissionStats.pendingEarnings,
    thisMonthEarnings: mockCommissionStats.thisMonthEarnings,
    averageCommissionRate: mockCommissionStats.averageCommissionRate,
    commissionTrends: commissionTrends || null,
    monthlyGoals: monthlyGoals || mockMonthlyGoals,
    isLoading: commissionsLoading || statsLoading || trendsLoading || goalsLoading,
  };
};