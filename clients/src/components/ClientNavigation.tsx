import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, FolderOpen, User, Settings } from 'lucide-react';

const navigationItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const ClientNavigation: React.FC = () => {
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
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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