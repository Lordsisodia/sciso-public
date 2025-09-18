import React from 'react';
import { Hero, DashboardStats, Card } from '@siso-public/shared-ui';
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react';
import { usePartnerData } from '../hooks/usePartnerData';

export const HomePage: React.FC = () => {
  const { stats, recentCommissions, isLoading } = usePartnerData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const quickStats = [
    {
      title: 'Total Earnings',
      value: `$${stats?.totalEarnings?.toLocaleString() || '0'}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Referrals',
      value: stats?.totalReferrals?.toString() || '0',
      icon: Users,
      change: '+3',
      changeType: 'positive' as const
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Partner Tier',
      value: stats?.tier || 'Bronze',
      icon: Award,
      change: 'Upgrade Available',
      changeType: 'neutral' as const
    }
  ];

  return (
    <div className="space-y-8">
      <Hero
        title="Welcome to SISO Partner Portal"
        subtitle="Track your commissions, manage referrals, and grow your partnership with SISO"
        variant="partner"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Commissions</h3>
          <div className="space-y-3">
            {recentCommissions?.map((commission, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{commission.clientName}</p>
                  <p className="text-sm text-gray-500">{commission.date}</p>
                </div>
                <p className="font-semibold text-green-600">+${commission.amount}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Up to 30% commission on referrals</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Monthly performance bonuses</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Exclusive partner resources</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Dedicated partner support</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};