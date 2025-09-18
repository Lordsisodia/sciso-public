import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  MessageSquare,
  HandShake,
  Settings,
  FileText,
  TeamIcon as Team,
  CreditCard,
  PlanIcon as Plan,
  Figma,
  MessageCircle,
  GitBranch,
  Calendar
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  
  // Client Management
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
  { name: 'Outreach', href: '/admin/outreach', icon: MessageSquare },
  
  // Partnership
  { name: 'Partnership', href: '/admin/partnership/dashboard', icon: HandShake },
  
  // Operations  
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Templates', href: '/admin/templates', icon: FileText },
  { name: 'Teams', href: '/admin/teams', icon: Team },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  
  // Planning
  { name: 'Plans', href: '/admin/plans', icon: Plan },
  { name: 'Wireframes', href: '/admin/wireframes', icon: Figma },
  { name: 'Prompts', href: '/admin/prompts', icon: MessageCircle },
  { name: 'User Flow', href: '/admin/userflow', icon: GitBranch },
  { name: 'Daily Planner', href: '/admin/planner', icon: Calendar },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">SISO Admin</h1>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};