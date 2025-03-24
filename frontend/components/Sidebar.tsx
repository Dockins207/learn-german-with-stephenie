import Link from 'next/link';
import {
  HomeIcon,
  CalendarIcon,
  BuildingOffice2Icon,
  VideoCameraIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={`h-full transition-all duration-300 ${
      isOpen ? 'w-48' : 'w-16'
    } bg-white border-r border-gray-200`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1">
            <Link href="/" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <HomeIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Home</span>}
            </Link>
            <Link href="/calendar" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <CalendarIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Calendar & Schedule</span>}
            </Link>
            <Link href="/classrooms" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <BuildingOffice2Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Classrooms</span>}
            </Link>
            <Link href="/recordings" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <VideoCameraIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Recorded Classes</span>}
            </Link>
            <Link href="/assignments" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <AcademicCapIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Assignments & Quizzes</span>}
            </Link>
            <Link href="/materials" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <BookOpenIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Learning Materials</span>}
            </Link>
            <Link href="/peers" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <UserGroupIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Peers</span>}
            </Link>
            <Link href="/profile" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <UserCircleIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Profile</span>}
            </Link>
          </nav>
        </div>
        
        {/* Logout button below profile */}
        <div className="border-t border-gray-200 px-4 py-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-md p-2"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="block">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
