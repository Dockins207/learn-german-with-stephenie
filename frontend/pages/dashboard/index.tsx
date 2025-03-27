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
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="py-6">
          {/* Horizontal line */}
          <hr className="border-t border-gray-300 w-full mb-6" />
          
          {/* Header with welcome message */}
          <div className="mb-8 pl-1">
            <h1 className="text-2xl font-bold text-gray-900 border border-gray-300 p-3 rounded-md inline-block max-w-md">
              Welcome back, {student?.first_name || 'Student'}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
