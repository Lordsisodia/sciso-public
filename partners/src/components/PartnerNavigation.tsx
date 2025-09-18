import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, DollarSign, Users, User, Settings, Award } from 'lucide-react';

const navigationItems = [
  { to: '/', icon: Home, label: 'Overview' },
  { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/commissions', icon: DollarSign, label: 'Commissions' },
  { to: '/program', icon: Award, label: 'Program Details' },
  { to: '/referrals', icon: Users, label: 'Referrals' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const PartnerNavigation: React.FC = () => {
  return (
    <nav className="flex-1 px-4 space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
              }`
            }
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
};