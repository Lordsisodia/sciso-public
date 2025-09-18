import React, { useState } from 'react';
import { Card, Button, DataTable, Select } from '@siso-public/shared-ui';
import { DollarSign, TrendingUp, Download, Filter, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { usePartnerCommissions } from '../hooks/usePartnerCommissions';

export const CommissionsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { 
    commissions, 
    totalEarnings, 
    pendingEarnings, 
    thisMonthEarnings,
    isLoading 
  } = usePartnerCommissions({ timeRange, status: statusFilter });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const commissionStats = [
    {
      title: 'Total Earnings',
      value: `$${totalEarnings?.toLocaleString() || '0'}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Pending Earnings',
      value: `$${pendingEarnings?.toLocaleString() || '0'}`,
      icon: Clock,
      change: '5 pending',
      changeType: 'neutral' as const
    },
    {
      title: 'This Month',
      value: `$${thisMonthEarnings?.toLocaleString() || '0'}`,
      icon: TrendingUp,
      change: '+23.1%',
      changeType: 'positive' as const
    }
  ];

  const commissionColumns = [
    {
      header: 'Client',
      accessorKey: 'clientName',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.clientName}</div>
          <div className="text-sm text-gray-500">{row.original.projectType}</div>
        </div>
      )
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-600">{row.original.date}</span>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }: any) => (
        <span className="font-semibold text-green-600">
          ${row.original.amount.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Commission Rate',
      accessorKey: 'rate',
      cell: ({ row }: any) => (
        <span className="text-sm text-gray-600">{row.original.rate}%</span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }: any) => {
        const status = row.original.status;
        const statusConfig = {
          paid: { icon: CheckCircle, text: 'Paid', className: 'text-green-600 bg-green-100' },
          pending: { icon: Clock, text: 'Pending', className: 'text-yellow-600 bg-yellow-100' },
          cancelled: { icon: XCircle, text: 'Cancelled', className: 'text-red-600 bg-red-100' }
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
            <Icon className="h-3 w-3 mr-1" />
            {config.text}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Commissions</h1>
        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {commissionStats.map((stat) => {
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

      {/* Filters */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <Select 
            value={timeRange}
            onValueChange={setTimeRange}
            placeholder="Time Range"
          >
            <option value="last-7-days">Last 7 days</option>
            <option value="last-30-days">Last 30 days</option>
            <option value="last-90-days">Last 90 days</option>
            <option value="this-year">This year</option>
            <option value="all-time">All time</option>
          </Select>

          <Select 
            value={statusFilter}
            onValueChange={setStatusFilter}
            placeholder="Status"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>
      </Card>

      {/* Commissions Table */}
      <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
        <div className="p-6 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900">Commission History</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track all your commission earnings and their status
          </p>
        </div>
        <div className="p-6">
          <DataTable
            data={commissions || []}
            columns={commissionColumns}
            searchable
            pagination
          />
        </div>
      </Card>

      {/* Payment Schedule */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Next Payment Date</span>
              <span className="font-medium text-gray-900">March 15, 2024</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-900">Bank Transfer</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Minimum Payout</span>
              <span className="font-medium text-gray-900">$100</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Payment Frequency</span>
              <span className="font-medium text-gray-900">Monthly</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Processing Time</span>
              <span className="font-medium text-gray-900">3-5 business days</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Tax Documents</span>
              <Button variant="link" className="text-purple-600 p-0 h-auto">
                Download 1099
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};