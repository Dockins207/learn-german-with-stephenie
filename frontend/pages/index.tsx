// Available import paths:
// @components - ./components
// @pages - ./pages
// @styles - ./styles
// @utils - ./utils
// @hooks - ./hooks
// @context - ./context

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to German Learning Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start your German learning journey with interactive classes, assignments, and recordings.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
