import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@siso-public/shared-config';
import { AdminLayout } from './components/AdminLayout';

// Domain imports - migrated from SISO-CLIENT-BASE
import AdminDashboard from './domains/oversight/AdminDashboard';
import AdminTasks from './domains/oversight/AdminTasks';
import AdminDailyPlanner from './domains/oversight/AdminDailyPlanner';

import AdminClients from './domains/user-management/AdminClients';
import AdminTeams from './domains/user-management/AdminTeams';
import AdminOutreach from './domains/user-management/AdminOutreach';

import AdminPayments from './domains/analytics/AdminPayments';
import AdminPartnershipDashboard from './domains/analytics/partnership/AdminPartnershipDashboard';
import AdminPartnershipReferrals from './domains/analytics/partnership/AdminPartnershipReferrals';
import AdminPartnershipTraining from './domains/analytics/partnership/AdminPartnershipTraining';
import AdminPartnershipLeaderboard from './domains/analytics/partnership/AdminPartnershipLeaderboard';
import AdminPartnershipStatistics from './domains/analytics/partnership/AdminPartnershipStatistics';

import AdminTemplates from './domains/content-management/AdminTemplates';
import AdminPrompts from './domains/content-management/AdminPrompts';
import AdminWireframes from './domains/content-management/AdminWireframes';
import AdminPlans from './domains/content-management/AdminPlans';

import AdminSettings from './domains/system-operations/AdminSettings';
import AdminUserFlow from './domains/system-operations/AdminUserFlow';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            
            {/* Oversight Domain - Daily Operations */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="planner" element={<AdminDailyPlanner />} />
            
            {/* User Management Domain */}
            <Route path="clients" element={<AdminClients />} />
            <Route path="teams" element={<AdminTeams />} />
            <Route path="outreach" element={<AdminOutreach />} />
            
            {/* Analytics Domain */}
            <Route path="analytics/payments" element={<AdminPayments />} />
            <Route path="analytics/partnership/dashboard" element={<AdminPartnershipDashboard />} />
            <Route path="analytics/partnership/referrals" element={<AdminPartnershipReferrals />} />
            <Route path="analytics/partnership/training" element={<AdminPartnershipTraining />} />
            <Route path="analytics/partnership/leaderboard" element={<AdminPartnershipLeaderboard />} />
            <Route path="analytics/partnership/statistics" element={<AdminPartnershipStatistics />} />
            
            {/* Content Management Domain */}
            <Route path="content/templates" element={<AdminTemplates />} />
            <Route path="content/prompts" element={<AdminPrompts />} />
            <Route path="content/wireframes" element={<AdminWireframes />} />
            <Route path="content/plans" element={<AdminPlans />} />
            
            {/* System Operations Domain */}
            <Route path="system/settings" element={<AdminSettings />} />
            <Route path="system/userflow" element={<AdminUserFlow />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  );
};