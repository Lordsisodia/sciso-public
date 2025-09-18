import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@siso-public/shared-config';
import { Footer } from '@siso-public/shared-ui';
import { PartnerLayout } from './components/PartnerLayout';

// NEW DOMAIN-BASED IMPORTS - Migrated from SISO-PARTNERSHIPS
// Referral Management Domain
import { OnboardingFlow, ClientManagement, DirectReferralsSOP, InternalNetworkSOP, LinkedInOutreachSOP, SocialMediaSOP } from './domains/referral-management';

// Commission Tracking Domain
import { EarningsCenter, LeaderboardsPage, PaymentsPage, AffiliateLeaderboard } from './domains/commission-tracking';

// Partner Resources Domain
import { MarketingResources, CommunityHub, EducationHub, TrainingHub, Support } from './domains/partner-resources';

// Certification Domain
import { CertificationCenter } from './domains/certification';

// Analytics Domain
import { PerformanceAnalytics, ReferralsManagement } from './domains/analytics';

// Legacy pages (to be replaced)
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Routes>
          <Route path="/" element={<PartnerLayout />}>
            <Route index element={<DashboardPage />} />
            
            {/* Domain-Based Partner Routes - Migrated from SISO-PARTNERSHIPS */}
            
            {/* Referral Management Domain */}
            <Route path="onboarding" element={<OnboardingFlow />} />
            <Route path="referrals/clients" element={<ClientManagement />} />
            <Route path="referrals/direct-sop" element={<DirectReferralsSOP />} />
            <Route path="referrals/network-sop" element={<InternalNetworkSOP />} />
            <Route path="referrals/linkedin-sop" element={<LinkedInOutreachSOP />} />
            <Route path="referrals/social-sop" element={<SocialMediaSOP />} />
            
            {/* Commission Tracking Domain */}
            <Route path="earnings" element={<EarningsCenter />} />
            <Route path="earnings/center" element={<EarningsCenter />} />
            <Route path="commission/leaderboards" element={<LeaderboardsPage />} />
            <Route path="commission/payments" element={<PaymentsPage />} />
            <Route path="commission/affiliate" element={<AffiliateLeaderboard />} />
            
            {/* Partner Resources Domain */}
            <Route path="marketing" element={<MarketingResources />} />
            <Route path="marketing/resources" element={<MarketingResources />} />
            <Route path="community" element={<CommunityHub />} />
            <Route path="community/hub" element={<CommunityHub />} />
            <Route path="education" element={<EducationHub />} />
            <Route path="education/hub" element={<EducationHub />} />
            <Route path="training" element={<TrainingHub />} />
            <Route path="training/hub" element={<TrainingHub />} />
            <Route path="support" element={<Support />} />
            
            {/* Certification Domain */}
            <Route path="certifications" element={<CertificationCenter />} />
            <Route path="certifications/center" element={<CertificationCenter />} />
            
            {/* Analytics Domain */}
            <Route path="analytics" element={<PerformanceAnalytics />} />
            <Route path="analytics/performance" element={<PerformanceAnalytics />} />
            <Route path="analytics/referrals" element={<ReferralsManagement />} />

            {/* Legacy Routes (will be phased out) */}
            <Route path="home" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </AppProvider>
  );
};