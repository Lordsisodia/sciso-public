import React from 'react';
import { ProfileForm, AccountSettings, NotificationSettings } from '@siso-public/shared-ui';
import { useClientProfile } from '../hooks/useClientProfile';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, isLoading } = useClientProfile();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileForm
              profile={profile}
              onUpdate={updateProfile}
              variant="client"
            />
            
            <AccountSettings
              profile={profile}
              onUpdate={updateProfile}
            />
          </div>
          
          <div>
            <NotificationSettings
              profile={profile}
              onUpdate={updateProfile}
            />
          </div>
        </div>
      )}
    </div>
  );
};