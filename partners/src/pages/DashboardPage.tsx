import React from 'react';
import { DashboardGrid, ActivityFeed, Card } from '@siso-public/shared-ui';
import { TrendingUp, Users, DollarSign, Award, Target, Calendar } from 'lucide-react';
import { usePartnerData } from '../hooks/usePartnerData';
import { usePartnerCommissions } from '../hooks/usePartnerCommissions';

export const DashboardPage: React.FC = () => {
  const { stats, recentActivity, isLoading } = usePartnerData();
  const { commissionTrends, monthlyGoals } = usePartnerCommissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const dashboardMetrics = [
    {
      title: 'Total Earnings',
      value: `$${stats?.totalEarnings?.toLocaleString() || '0'}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Active Referrals',
      value: stats?.activeReferrals?.toString() || '0',
      change: '+3',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Partner Tier',
      value: stats?.tier || 'Bronze',
      change: stats?.nextTierProgress ? `${stats.nextTierProgress}% to next tier` : 'Upgrade Available',
      changeType: 'neutral' as const,
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Updated 5 minutes ago</span>
        </div>
      </div>

      <DashboardGrid metrics={dashboardMetrics} variant="partner" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ActivityFeed 
            activities={recentActivity || []} 
            title="Recent Partner Activity"
            variant="partner"
          />
        </div>

        {/* Monthly Goals */}
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Goals</h3>
            <Target className="h-5 w-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            {monthlyGoals?.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                  <span className="text-sm text-gray-500">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{goal.current} / {goal.target}</span>
                  <span className={goal.progress >= 100 ? 'text-green-600' : 'text-gray-500'}>
                    {goal.progress >= 100 ? 'Complete!' : `${goal.target - goal.current} remaining`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Commission Trends */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Trends</h3>
        <div className="h-64">
          {commissionTrends && (
            <div className="text-center text-gray-500 mt-20">
              Commission trend chart will be rendered here with Recharts
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};