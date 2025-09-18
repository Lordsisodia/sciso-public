import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Button } from '@siso-public/shared-ui';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center px-6">
        <Logo size="xl" className="mx-auto mb-8" />
        
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              onClick={() => window.history.back()} 
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Looking for something specific?</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/clients" className="text-blue-600 hover:underline">Client Portal</Link>
              <Link to="/partners" className="text-purple-600 hover:underline">Partner Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};