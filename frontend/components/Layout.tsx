import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Copyright from './Copyright';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header onMenuClick={toggleSidebar} />
      </div>

      <div className="flex pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-16 bottom-0">
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Main Content - Scrollable */}
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-48' : 'ml-16'
        } p-6 overflow-y-auto min-h-[calc(100vh-4rem)]`}>
          {children}
        </main>
      </div>

      {/* Copyright Notice */}
      <Copyright />
      <Analytics />
    </div>
  );
};

export default Layout;
