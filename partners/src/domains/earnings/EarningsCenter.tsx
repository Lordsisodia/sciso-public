import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  CreditCard,
  Users,
  Activity
} from 'lucide-react';

interface EarningsData {
  totalEarnings: number;
  monthlyEarnings: number;
  pendingPayouts: number;
  totalReferrals: number;
  conversionRate: number;
  averageCommission: number;
}

interface Commission {
  id: string;
  clientName: string;
  projectType: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  date: string;
}

export const EarningsCenter: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const earningsData: EarningsData = {
    totalEarnings: 24500,
    monthlyEarnings: 4200,
    pendingPayouts: 1800,
    totalReferrals: 14,
    conversionRate: 68,
    averageCommission: 1750
  };

  const recentCommissions: Commission[] = [
    {
      id: '1',
      clientName: 'TechCorp Solutions',
      projectType: 'Web Development',
      amount: 2500,
      status: 'paid',
      date: '2024-01-15'
    },
    {
      id: '2', 
      clientName: 'StartupXYZ',
      projectType: 'Mobile App',
      amount: 1800,
      status: 'approved',
      date: '2024-01-10'
    },
    {
      id: '3',
      clientName: 'E-commerce Co',
      projectType: 'Full Stack',
      amount: 3200,
      status: 'pending',
      date: '2024-01-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings Center</h1>
          <p className="text-gray-600">Track your commissions and payouts</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12.5% from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.monthlyEarnings.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-blue-600">3 active referrals</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
              <p className="text-2xl font-bold text-gray-900">${earningsData.pendingPayouts.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Users className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm text-yellow-600">2 clients pending</span>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-medium">{earningsData.conversionRate}%</span>
              </div>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${earningsData.conversionRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Referrals</span>
                <span className="font-medium">{earningsData.totalReferrals}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Commission</span>
                <span className="font-medium">${earningsData.averageCommission}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Commissions</h3>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
          </div>
          <div className="space-y-4">
            {recentCommissions.map((commission, index) => (
              <motion.div
                key={commission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{commission.clientName}</h4>
                  <p className="text-sm text-gray-600">{commission.projectType}</p>
                  <p className="text-xs text-gray-500">{commission.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${commission.amount.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                    {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};