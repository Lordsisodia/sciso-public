import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { usePartnerProfile } from '../hooks/usePartnerProfile';

export const PartnerHeader: React.FC = () => {
  const { profile } = usePartnerProfile();

  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-purple-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-purple-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">
                {profile?.name?.charAt(0) || 'P'}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{profile?.name || 'Partner'}</p>
              <p className="text-xs text-gray-500">{profile?.tier || 'Bronze'} Partner</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};