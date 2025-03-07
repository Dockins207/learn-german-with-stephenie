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
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
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
              {isOpen && <span className="block">Study Materials</span>}
            </Link>
            <Link href="/peers" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <UserGroupIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Peers</span>}
            </Link>
          </nav>
        </div>
        
        {/* Profile section at the bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-400 text-sm">P</span>
            </div>
            {isOpen && (
              <Link href="/profile" className="text-gray-600 hover:text-blue-600 block">
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
