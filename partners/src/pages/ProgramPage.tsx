import React from 'react';
import { Card, Button, Badge } from '@siso-public/shared-ui';
import { Award, Star, TrendingUp, Users, DollarSign, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { usePartnerProfile } from '../hooks/usePartnerProfile';

export const ProgramPage: React.FC = () => {
  const { profile, tierProgress, isLoading } = usePartnerProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const partnerTiers = [
    {
      name: 'Bronze',
      minReferrals: 0,
      commissionRate: '15%',
      benefits: [
        'Basic partner resources',
        'Monthly payments',
        'Email support',
        'Marketing materials'
      ],
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'Silver',
      minReferrals: 10,
      commissionRate: '20%',
      benefits: [
        'All Bronze benefits',
        'Priority support',
        'Custom referral codes',
        'Performance bonuses',
        'Quarterly reviews'
      ],
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Gold',
      minReferrals: 25,
      commissionRate: '25%',
      benefits: [
        'All Silver benefits',
        'Dedicated account manager',
        'Advanced analytics',
        'Co-marketing opportunities',
        'VIP event invitations'
      ],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Platinum',
      minReferrals: 50,
      commissionRate: '30%',
      benefits: [
        'All Gold benefits',
        'Custom commission rates',
        'White-label options',
        'Direct revenue share',
        'Strategic partnership meetings'
      ],
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const currentTier = profile?.tier || 'Bronze';
  const currentTierIndex = partnerTiers.findIndex(tier => tier.name === currentTier);

  const programFeatures = [
    {
      icon: DollarSign,
      title: 'Competitive Commissions',
      description: 'Earn up to 30% commission on successful referrals with our tiered program'
    },
    {
      icon: TrendingUp,
      title: 'Performance Bonuses',
      description: 'Receive additional bonuses for exceeding monthly and quarterly targets'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Get priority support and dedicated account management as you grow'
    },
    {
      icon: Gift,
      title: 'Exclusive Benefits',
      description: 'Access to exclusive events, co-marketing opportunities, and more'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partnership Program</h1>
          <p className="text-gray-600 mt-2">
            Grow your earnings through our comprehensive partner program
          </p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          Current: {currentTier} Partner
        </Badge>
      </div>

      {/* Current Tier Progress */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">{currentTier} Partner</span>
          </div>
        </div>
        
        {currentTierIndex < partnerTiers.length - 1 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Progress to {partnerTiers[currentTierIndex + 1].name}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {profile?.totalReferrals || 0} / {partnerTiers[currentTierIndex + 1].minReferrals} referrals
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, ((profile?.totalReferrals || 0) / partnerTiers[currentTierIndex + 1].minReferrals) * 100)}%` 
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {partnerTiers[currentTierIndex + 1].minReferrals - (profile?.totalReferrals || 0)} more referrals needed for {partnerTiers[currentTierIndex + 1].name} tier
            </p>
          </div>
        )}
      </Card>

      {/* Program Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-6 bg-white/70 backdrop-blur-sm border-purple-200 text-center">
              <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                <Icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Tier Information */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTiers.map((tier, index) => {
            const isCurrentTier = tier.name === currentTier;
            const isUnlocked = index <= currentTierIndex;
            
            return (
              <Card 
                key={tier.name} 
                className={`p-6 relative overflow-hidden ${
                  isCurrentTier 
                    ? 'ring-2 ring-purple-500 bg-white' 
                    : isUnlocked 
                      ? 'bg-white/70 backdrop-blur-sm border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                {isCurrentTier && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-purple-500 text-white px-2 py-1 text-xs font-medium rounded-bl-lg">
                      Current
                    </div>
                  </div>
                )}
                
                <div className={`h-2 w-full bg-gradient-to-r ${tier.color} rounded-full mb-4`}></div>
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-600">{tier.minReferrals}+ referrals</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">{tier.commissionRate}</p>
                  <p className="text-xs text-gray-500">commission rate</p>
                </div>

                <ul className="space-y-2">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <CheckCircle className={`h-4 w-4 mr-2 ${isUnlocked ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={isUnlocked ? 'text-gray-700' : 'text-gray-400'}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {!isUnlocked && (
                  <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <p className="text-sm font-medium text-gray-600">
                        Unlock with {tier.minReferrals} referrals
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Ready to grow your partnership?</h3>
            <p className="text-purple-100">
              Start referring clients today and unlock higher commission rates and exclusive benefits.
            </p>
          </div>
          <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            Get Referral Link
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Resources */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            Marketing Materials
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            Training Resources
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            Partner Handbook
          </Button>
        </div>
      </Card>
    </div>
  );
};