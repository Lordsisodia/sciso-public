import React from 'react';
import { Link } from 'react-router-dom';
import { Hero, Logo, Button, Card } from '@siso-public/shared-ui';
import { Users, DollarSign, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="lg" showText />
            <div className="flex items-center space-x-4">
              <Link to="/clients" className="text-gray-600 hover:text-blue-600 transition-colors">
                Client Portal
              </Link>
              <Link to="/partners" className="text-gray-600 hover:text-purple-600 transition-colors">
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SISO</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform for client collaboration and partnership growth. 
            Streamline your workflows, track progress, and unlock new opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clients">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Access Client Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/partners">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Join Partner Network
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SISO?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines powerful client management with lucrative partnership opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Management</h3>
              <p className="text-gray-600">Streamlined project tracking and collaboration tools</p>
            </Card>

            <Card className="p-6 text-center bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Commissions</h3>
              <p className="text-gray-600">Up to 30% commission on successful referrals</p>
            </Card>

            <Card className="p-6 text-center bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">Track performance and optimize your strategies</p>
            </Card>

            <Card className="p-6 text-center bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tier Rewards</h3>
              <p className="text-gray-600">Unlock benefits as you grow your partnership</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Clients</h2>
              <ul className="space-y-4">
                {[
                  'Project management and tracking',
                  'Real-time collaboration tools',
                  'Comprehensive analytics dashboard',
                  'Dedicated support team',
                  'Secure document sharing',
                  'Mobile-friendly interface'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/clients" className="inline-block mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explore Client Portal
                </Button>
              </Link>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Partners</h2>
              <ul className="space-y-4">
                {[
                  'Earn up to 30% commission',
                  'Four-tier reward system',
                  'Comprehensive referral tracking',
                  'Marketing resources provided',
                  'Monthly performance bonuses',
                  'Dedicated partner support'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/partners" className="inline-block mt-6">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Join Partner Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients and partners who trust SISO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clients">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Client Login
              </Button>
            </Link>
            <Link to="/partners">
              <Button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};