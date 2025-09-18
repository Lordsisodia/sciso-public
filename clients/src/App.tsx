import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@siso-public/shared-ui';

// Core Pages
import Index from './pages/core/Index';
import Home from './pages/core/Home';
import SimpleIndex from './pages/core/SimpleIndex';
import MinimalApp from './pages/core/MinimalApp';

// Auth Pages
import Auth from './pages/auth/Auth';
import Profile from './pages/auth/Profile';

// Industry Landing Pages
import RestaurantLandingPage from './components/landing/RestaurantLandingPage';
import FitnessLandingPage from './components/landing/FitnessLandingPage';
import HealthcareLandingPage from './components/landing/HealthcareLandingPage';
import BarbershopLandingPage from './components/landing/BarbershopLandingPage';
import AutoRepairLandingPage from './components/landing/AutoRepairLandingPage';
import RealEstateLandingPage from './components/landing/RealEstateLandingPage';
import LawFirmLandingPage from './components/landing/LawFirmLandingPage';
import BeautyLandingPage from './components/landing/BeautyLandingPage';
import DigitalMarketingLandingPage from './components/landing/DigitalMarketingLandingPage';
import AccountingLandingPage from './components/landing/AccountingLandingPage';
import HomeServicesLandingPage from './components/landing/HomeServicesLandingPage';
import RetailLandingPage from './components/landing/RetailLandingPage';
import PhotographyLandingPage from './components/landing/PhotographyLandingPage';
import PetServicesLandingPage from './components/landing/PetServicesLandingPage';
import ConstructionLandingPage from './components/landing/ConstructionLandingPage';
import CleaningLandingPage from './components/landing/CleaningLandingPage';
import ConsultingLandingPage from './components/landing/ConsultingLandingPage';
import VideoProductionLandingPage from './components/landing/VideoProductionLandingPage';
import FinancialServicesLandingPage from './components/landing/FinancialServicesLandingPage';
import EducationLandingPage from './components/landing/EducationLandingPage';
import TravelLandingPage from './components/landing/TravelLandingPage';
import FoodServicesLandingPage from './components/landing/FoodServicesLandingPage';
import TechnologyLandingPage from './components/landing/TechnologyLandingPage';
import ManufacturingLandingPage from './components/landing/ManufacturingLandingPage';
import NonprofitLandingPage from './components/landing/NonprofitLandingPage';
import EventPlanningLandingPage from './components/landing/EventPlanningLandingPage';
import LogisticsLandingPage from './components/landing/LogisticsLandingPage';
import EnergyLandingPage from './components/landing/EnergyLandingPage';
import EcommerceLandingPage from './components/landing/EcommerceLandingPage';
import ProfessionalServicesLandingPage from './components/landing/ProfessionalServicesLandingPage';
import AgencyLandingPage from './components/landing/AgencyLandingPage';

// Test & Development Pages
import TestPage from './pages/debug/TestPage';
import DebugPage from './pages/debug/DebugPage';

// Dashboard Pages
import SimpleDashboard from './pages/dashboard/SimpleDashboard';
import BasicDashboard from './pages/dashboard/BasicDashboard';
import TestDashboard from './pages/dashboard/TestDashboard';
import EnhancedDashboard from './pages/dashboard/EnhancedDashboard';
import IntegratedDashboard from './pages/dashboard/IntegratedDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';

// Project Pages
import Projects from './pages/projects/Projects';
import MyProjects from './pages/projects/MyProjects';
import ProjectDetailsPage from './pages/projects/ProjectDetailsPage';
import ProjectOnboardingPage from './pages/projects/ProjectOnboardingPage';
import ProjectsAndTasksPage from './pages/projects/ProjectsAndTasksPage';
import TimelinePage from './pages/projects/TimelinePage';
import UserFlow from './pages/projects/UserFlow';
import UserFlowFeedbackPage from './pages/projects/UserFlowFeedbackPage';
import UserFlowNodesPage from './pages/projects/UserFlowNodesPage';
import UserFlowCodePage from './pages/projects/UserFlowCodePage';

// Client-Specific Pages
import DecoraPlan from './pages/client-specific/DecoraPlan';
import CryptoExchange from './pages/client-specific/CryptoExchange';
import AppPlan from './pages/client-specific/AppPlan';
import AppPlanPage from './pages/client-specific/AppPlanPage';
import PlanBuilder from './pages/client-specific/PlanBuilder';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminPlans from './pages/admin/AdminPlans';
import AdminWireframes from './pages/admin/AdminWireframes';
import AdminOutreach from './pages/admin/AdminOutreach';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminTeams from './pages/admin/AdminTeams';
import AdminPayments from './pages/admin/AdminPayments';
import AdminDailyPlanner from './pages/admin/AdminDailyPlanner';
import AdminTasks from './pages/admin/AdminTasks';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPrompts from './pages/admin/AdminPrompts';
import AdminUserFlow from './pages/admin/AdminUserFlow';

// Business Core Pages
import Portfolio from './pages/core/Portfolio';
import PublicPortfolio from './pages/core/PublicPortfolio';
import Community from './pages/core/Community';
import Tools from './pages/core/Tools';
import ToolPage from './pages/core/ToolPage';
import Communication from './pages/core/Communication';
import Networking from './pages/core/Networking';

// NEW DOMAIN-BASED IMPORTS - Migrated from SISO-CLIENT-BASE
// Project Management Domain
import ClientOnboardingPage from './domains/project-management/ClientOnboardingPage';
import ClientTasksPage from './domains/project-management/ClientTasksPage';
import ClientTimelinePage from './domains/project-management/ClientTimelinePage';
import ClientProjectRoadmapPage from './domains/project-management/ClientProjectRoadmapPage';
import ClientAppPlanPage from './domains/project-management/ClientAppPlanPage';
import ClientWorkInProgressPage from './domains/project-management/ClientWorkInProgressPage';
import ClientStatusPage from './domains/project-management/ClientStatusPage';
import ClientAgentTeamsPage from './domains/project-management/ClientAgentTeamsPage';
import ClientLaunchPreparationPage from './domains/project-management/ClientLaunchPreparationPage';
import ClientLiveMaintenancePage from './domains/project-management/ClientLiveMaintenancePage';

// Client Relationship Domain  
import ClientDetailPage from './domains/client-relationship/ClientDetailPage';

// Portfolio Domain
import PublicPlanView from './domains/portfolio/PublicPlanView';

// Business Tools Domain
import SisoAI from './domains/business-tools/SisoAI';
import Automations from './domains/business-tools/Automations';

// Learning Network Domain
import LearnNetwork from './domains/learning-network/LearnNetwork';
import HelpPage from './domains/learning-network/HelpPage';

// Financial Pages
import PaymentsPage from './pages/financial/PaymentsPage';
import LeaderboardPage from './pages/financial/LeaderboardPage';
import FinancialProfilePage from './pages/financial/FinancialProfilePage';
import HowToEarn from './pages/financial/HowToEarn';
import Economy from './pages/financial/Economy';

// Content Pages
import BlogPost from './pages/content/BlogPost';
import AINews from './pages/content/AINews';
import DailyNews from './pages/content/DailyNews';
import Changelog from './pages/content/Changelog';

// Support & Resources
import ResourcesPage from './pages/resources/ResourcesPage';
import DocumentLibraryPage from './pages/resources/DocumentLibraryPage';

// Onboarding & Thank You Pages
import OnboardingChat from './pages/onboarding/OnboardingChat';
import ThankYou from './pages/onboarding/ThankYou';
import ThankYouPlan from './pages/onboarding/ThankYouPlan';

// Client Portal Pages  
import ClientAppDetailsPage from './pages/client/ClientAppDetailsPage';
import ClientPortalLogin from './pages/client/ClientPortalLogin';

// Automation Pages
import AutomationPage from './pages/automation/AutomationPage';

// Other Features
import InstagramLeads from './pages/features/InstagramLeads';

// Legal Pages
import Terms from './pages/legal/Terms';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';

// Additional Onboarding
import Congratulations from './pages/onboarding/congratulations';
import Social from './pages/onboarding/social';

// Additional Project Pages
import UserFlowCodePage from './pages/projects/UserFlowCodePage';
import UserFlowFeedbackPage from './pages/projects/UserFlowFeedbackPage';
import UserFlowNodesPage from './pages/projects/UserFlowNodesPage';
import UserFlowPage from './pages/projects/UserFlowPage';

// Guards and Components
import { AuthGuard } from './components/auth/AuthGuard';

function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-gray-400">There was an error loading this page</p>
        <button 
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-[#ea384c] text-white rounded hover:bg-[#d42c47]"
        >
          Try again
        </button>
        <div className="mt-4">
          <a 
            href="/clients/testing" 
            className="text-[#ea384c] hover:underline"
          >
            🧪 Access AI Testing Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          {/* Test route for diagnosis */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/debug" element={<DebugPage />} />
          
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/simple" element={<SimpleIndex />} />
          <Route path="/minimal" element={<MinimalApp />} />
          
          {/* Industry Landing Pages */}
          <Route path="/restaurant" element={<RestaurantLandingPage />} />
          <Route path="/fitness" element={<FitnessLandingPage />} />
          <Route path="/healthcare" element={<HealthcareLandingPage />} />
          <Route path="/barbershop" element={<BarbershopLandingPage />} />
          <Route path="/auto-repair" element={<AutoRepairLandingPage />} />
          <Route path="/real-estate" element={<RealEstateLandingPage />} />
          <Route path="/law-firm" element={<LawFirmLandingPage />} />
          <Route path="/beauty" element={<BeautyLandingPage />} />
          <Route path="/digital-marketing" element={<DigitalMarketingLandingPage />} />
          <Route path="/accounting" element={<AccountingLandingPage />} />
          <Route path="/home-services" element={<HomeServicesLandingPage />} />
          <Route path="/retail" element={<RetailLandingPage />} />
          <Route path="/photography" element={<PhotographyLandingPage />} />
          <Route path="/pet-services" element={<PetServicesLandingPage />} />
          <Route path="/construction" element={<ConstructionLandingPage />} />
          <Route path="/cleaning" element={<CleaningLandingPage />} />
          <Route path="/consulting" element={<ConsultingLandingPage />} />
          <Route path="/video-production" element={<VideoProductionLandingPage />} />
          <Route path="/financial-services" element={<FinancialServicesLandingPage />} />
          <Route path="/education" element={<EducationLandingPage />} />
          <Route path="/travel" element={<TravelLandingPage />} />
          <Route path="/food-services" element={<FoodServicesLandingPage />} />
          <Route path="/technology" element={<TechnologyLandingPage />} />
          <Route path="/manufacturing" element={<ManufacturingLandingPage />} />
          <Route path="/non-profit" element={<NonprofitLandingPage />} />
          <Route path="/event-planning" element={<EventPlanningLandingPage />} />
          <Route path="/logistics" element={<LogisticsLandingPage />} />
          <Route path="/energy" element={<EnergyLandingPage />} />
          <Route path="/ecommerce" element={<EcommerceLandingPage />} />
          <Route path="/professional" element={<ProfessionalServicesLandingPage />} />
          <Route path="/agency" element={<AgencyLandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<TestDashboard />} />
          <Route path="/dashboard/simple" element={<SimpleDashboard />} />
          <Route path="/dashboard/basic" element={<BasicDashboard />} />
          <Route path="/dashboard/enhanced" element={<EnhancedDashboard />} />
          <Route path="/dashboard/integrated" element={<IntegratedDashboard />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          
          {/* Project Routes */}
          <Route path="/projects" element={<AuthGuard><Projects /></AuthGuard>} />
          <Route path="/projects/my" element={<AuthGuard><MyProjects /></AuthGuard>} />
          <Route path="/projects/new" element={<AuthGuard><ProjectOnboardingPage /></AuthGuard>} />
          <Route path="/projects/tasks" element={<AuthGuard><ProjectsAndTasksPage /></AuthGuard>} />
          <Route path="/projects/timeline" element={<AuthGuard><TimelinePage /></AuthGuard>} />
          <Route path="/projects/:id" element={<AuthGuard><ProjectDetailsPage /></AuthGuard>} />
          <Route path="/projects/:id/userflow" element={<AuthGuard><UserFlow /></AuthGuard>} />
          <Route path="/projects/:projectId/userflow" element={<AuthGuard><UserFlowPage /></AuthGuard>} />
          <Route path="/projects/:projectId/userflow/feedback" element={<AuthGuard><UserFlowFeedbackPage /></AuthGuard>} />
          <Route path="/projects/:projectId/userflow/nodes" element={<AuthGuard><UserFlowNodesPage /></AuthGuard>} />
          <Route path="/projects/:projectId/userflow/code" element={<AuthGuard><UserFlowCodePage /></AuthGuard>} />
          
          {/* Client-Specific Routes */}
          <Route path="/decora-plan" element={<DecoraPlan />} />
          <Route path="/crypto-exchange" element={<CryptoExchange />} />
          <Route path="/app-plan" element={<AuthGuard><AppPlan /></AuthGuard>} />
          <Route path="/app-plan/:username" element={<AppPlan />} />
          <Route path="/plan-builder" element={<AuthGuard><PlanBuilder /></AuthGuard>} />
          
          {/* Domain-Based Client Routes - Migrated from SISO-CLIENT-BASE */}
          {/* Project Management Domain */}
          <Route path="/client/onboarding" element={<AuthGuard><ClientOnboardingPage /></AuthGuard>} />
          <Route path="/client/tasks" element={<AuthGuard><ClientTasksPage /></AuthGuard>} />
          <Route path="/client/timeline" element={<AuthGuard><ClientTimelinePage /></AuthGuard>} />
          <Route path="/client/roadmap" element={<AuthGuard><ClientProjectRoadmapPage /></AuthGuard>} />
          <Route path="/client/app-plan" element={<AuthGuard><ClientAppPlanPage /></AuthGuard>} />
          <Route path="/client/work-in-progress" element={<AuthGuard><ClientWorkInProgressPage /></AuthGuard>} />
          <Route path="/client/status" element={<AuthGuard><ClientStatusPage /></AuthGuard>} />
          <Route path="/client/agent-teams" element={<AuthGuard><ClientAgentTeamsPage /></AuthGuard>} />
          <Route path="/client/launch-preparation" element={<AuthGuard><ClientLaunchPreparationPage /></AuthGuard>} />
          <Route path="/client/live-maintenance" element={<AuthGuard><ClientLiveMaintenancePage /></AuthGuard>} />
          
          {/* Client Relationship Domain */}
          <Route path="/client/details/:clientId" element={<AuthGuard><ClientDetailPage /></AuthGuard>} />
          
          {/* Portfolio Domain */}
          <Route path="/plan/:planId" element={<PublicPlanView />} />
          
          {/* Business Tools Domain */}
          <Route path="/client/ai" element={<AuthGuard><SisoAI /></AuthGuard>} />
          <Route path="/client/automations" element={<AuthGuard><Automations /></AuthGuard>} />
          
          {/* Learning Network Domain */}
          <Route path="/client/learn" element={<AuthGuard><LearnNetwork /></AuthGuard>} />
          <Route path="/client/help" element={<AuthGuard><HelpPage /></AuthGuard>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AuthGuard adminOnly={true}><AdminDashboard /></AuthGuard>} />
          <Route path="/admin/dashboard" element={<AuthGuard adminOnly={true}><AdminDashboard /></AuthGuard>} />
          <Route path="/admin/clients" element={<AuthGuard adminOnly={true}><AdminClients /></AuthGuard>} />
          <Route path="/admin/clients/:clientId" element={<AuthGuard adminOnly={true}><ClientDetailPage /></AuthGuard>} />
          <Route path="/admin/plans" element={<AuthGuard adminOnly={true}><AdminPlans /></AuthGuard>} />
          <Route path="/admin/wireframes" element={<AuthGuard adminOnly={true}><AdminWireframes /></AuthGuard>} />
          <Route path="/admin/outreach" element={<AuthGuard adminOnly={true}><AdminOutreach /></AuthGuard>} />
          <Route path="/admin/templates" element={<AuthGuard adminOnly={true}><AdminTemplates /></AuthGuard>} />
          <Route path="/admin/teams" element={<AuthGuard adminOnly={true}><AdminTeams /></AuthGuard>} />
          <Route path="/admin/payments" element={<AuthGuard adminOnly={true}><AdminPayments /></AuthGuard>} />
          <Route path="/admin/daily-planner" element={<AuthGuard adminOnly={true}><AdminDailyPlanner /></AuthGuard>} />
          <Route path="/admin/tasks" element={<AuthGuard adminOnly={true}><AdminTasks /></AuthGuard>} />
          <Route path="/admin/settings" element={<AuthGuard adminOnly={true}><AdminSettings /></AuthGuard>} />
          <Route path="/admin/prompts" element={<AuthGuard adminOnly={true}><AdminPrompts /></AuthGuard>} />
          <Route path="/admin/userflow" element={<AuthGuard adminOnly={true}><AdminUserFlow /></AuthGuard>} />
          
          {/* Business Core Routes */}
          <Route path="/portfolio" element={<PublicPortfolio />} />
          <Route path="/portfolio/admin" element={<AuthGuard><Portfolio /></AuthGuard>} />
          <Route path="/community" element={<Community />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/communication" element={<AuthGuard><Communication /></AuthGuard>} />
          <Route path="/networking" element={<Networking />} />
          
          {/* Financial Routes */}
          <Route path="/payments" element={<AuthGuard><PaymentsPage /></AuthGuard>} />
          <Route path="/leaderboard" element={<AuthGuard><LeaderboardPage /></AuthGuard>} />
          <Route path="/financial/profile" element={<AuthGuard><FinancialProfilePage /></AuthGuard>} />
          <Route path="/earn" element={<AuthGuard><HowToEarn /></AuthGuard>} />
          <Route path="/economy" element={<AuthGuard><Economy /></AuthGuard>} />
          
          {/* Content Routes */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/news/ai" element={<AINews />} />
          <Route path="/news/daily" element={<DailyNews />} />
          <Route path="/changelog" element={<Changelog />} />
          
          {/* Resources Routes */}
          <Route path="/resources" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
          <Route path="/resources/documents" element={<AuthGuard><DocumentLibraryPage /></AuthGuard>} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<OnboardingChat />} />
          <Route path="/onboarding/congratulations" element={<Congratulations />} />
          <Route path="/onboarding/social" element={<Social />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/thankyou-plan" element={<ThankYouPlan />} />
          
          {/* Legacy Client Portal Routes */}
          <Route path="/client-app/:clientId" element={<AuthGuard><ClientAppDetailsPage /></AuthGuard>} />
          <Route path="/client-login" element={<ClientPortalLogin />} />
          
          {/* Automation Routes */}
          <Route path="/automation" element={<AuthGuard><AutomationPage /></AuthGuard>} />
          
          {/* Feature Routes */}
          <Route path="/ai" element={<SisoAI />} />
          <Route path="/instagram-leads" element={<AuthGuard><InstagramLeads /></AuthGuard>} />
          
          {/* Legal Routes */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Fallback Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;