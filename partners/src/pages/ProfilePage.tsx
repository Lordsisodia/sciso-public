import React, { useState } from 'react';
import { Card, Button, Input, Select, TextArea } from '@siso-public/shared-ui';
import { User, Mail, Phone, MapPin, Link, Save, Camera, Shield, CreditCard, Bell } from 'lucide-react';
import { usePartnerProfile } from '../hooks/usePartnerProfile';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, isLoading, isUpdating } = usePartnerProfile();
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    company: profile?.company || '',
    website: profile?.website || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zipCode: profile?.zipCode || '',
    country: profile?.country || '',
    bio: profile?.bio || '',
    specialties: profile?.specialties || [],
    paymentMethod: profile?.paymentMethod || 'bank-transfer',
    bankAccount: profile?.bankAccount || '',
    routingNumber: profile?.routingNumber || '',
    taxId: profile?.taxId || '',
    notifications: {
      commissions: profile?.notifications?.commissions ?? true,
      marketing: profile?.notifications?.marketing ?? false,
      updates: profile?.notifications?.updates ?? true
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Partner Profile</h1>
        <Button 
          onClick={handleSubmit}
          disabled={isUpdating}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {activeTab === 'profile' && (
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                
                {/* Profile Picture */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <Button variant="outline" className="border-purple-200 text-purple-600">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <Input
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <Input
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                  <Input
                    label="Website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://"
                  />
                </div>

                <div className="mt-6">
                  <TextArea
                    label="Bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself and your expertise..."
                    rows={4}
                  />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Street Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                    <Input
                      label="State/Province"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                    <Input
                      label="ZIP/Postal Code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                    <Select
                      label="Country"
                      value={formData.country}
                      onValueChange={(value) => handleInputChange('country', value)}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'payment' && (
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    >
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="check">Check</option>
                    </Select>
                  </div>

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Bank Account Number"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                        placeholder="••••••••1234"
                      />
                      <Input
                        label="Routing Number"
                        value={formData.routingNumber}
                        onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                        placeholder="123456789"
                      />
                    </div>
                  )}

                  <Input
                    label="Tax ID (EIN/SSN)"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    placeholder="••-•••••••"
                  />

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Payment Information</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Payments are processed monthly on the 15th</li>
                      <li>• Minimum payout threshold is $100</li>
                      <li>• Processing time: 3-5 business days</li>
                      <li>• Tax documents will be provided annually</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Commission Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified when you earn new commissions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.commissions}
                      onChange={(e) => handleNotificationChange('commissions', e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing Updates</h4>
                      <p className="text-sm text-gray-600">Receive marketing materials and promotional content</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.marketing}
                      onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Program Updates</h4>
                      <p className="text-sm text-gray-600">Stay informed about program changes and new features</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.updates}
                      onChange={(e) => handleNotificationChange('updates', e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" className="border-purple-200 text-purple-600">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Account Actions</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        Deactivate Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};