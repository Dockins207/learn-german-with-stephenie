// Available import paths:
// @components - ./components
// @pages - ./pages
// @styles - ./styles
// @utils - ./utils
// @hooks - ./hooks
// @context - ./context

import { useState } from 'react';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Layout from '@components/Layout';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to German Learning Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Start your German learning journey with interactive classes, assignments, and recordings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Live Classes
            </h2>
            <p className="text-gray-600">
              Join live interactive German classes with experienced teachers.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Assignments
            </h2>
            <p className="text-gray-600">
              Practice your German skills with our comprehensive assignments.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              Recordings
            </h2>
            <p className="text-gray-600">
              Access past class recordings to review and learn at your own pace.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
