// Available import paths:
// @components - ./components
// @pages - ./pages
// @styles - ./styles
// @utils - ./utils
// @hooks - ./hooks
// @context - ./context

import { useState, useEffect } from 'react';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Layout from '@components/Layout';
import { useAuth } from '@context/AuthContext';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { student } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {/* Header with welcome message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {student?.first_name || 'Student'}
            </h1>
            <p className="mt-2 text-gray-600">
              Start your German learning journey with interactive classes, assignments, and recordings.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Classes Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Live Classes
                </h2>
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Join Class
                </button>
              </div>
              <p className="text-gray-600">
                Join live interactive German classes with experienced teachers.
              </p>
            </div>

            {/* Assignments Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Assignments
                </h2>
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  View All
                </button>
              </div>
              <p className="text-gray-600">
                Complete your German language assignments and track your progress.
              </p>
            </div>

            {/* Recordings Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recordings
                </h2>
                <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  View All
                </button>
              </div>
              <p className="text-gray-600">
                Access recorded classes and practice materials for offline learning.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-blue-50 p-4 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Join Class</span>
              </button>
              <button className="bg-green-50 p-4 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-100">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Assignments</span>
              </button>
              <button className="bg-purple-50 p-4 rounded-lg flex items-center justify-center text-purple-600 hover:bg-purple-100">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>View Recordings</span>
              </button>
              <button className="bg-gray-50 p-4 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
