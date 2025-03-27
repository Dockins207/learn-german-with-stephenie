import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  CalendarIcon,
  BuildingOffice2Icon,
  VideoCameraIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const router = useRouter();
  const { student } = useAuth();
  
  // Get profile picture if available
  const profilePicture = student?.profile_picture || null;
  
  return (
    <div className={`h-full transition-all duration-300 ${
      isOpen ? 'w-48' : 'w-16'
    } bg-white border-r border-gray-200`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1">
            <Link href="/" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <HomeIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Welcome Hub</span>}
            </Link>
            <Link href="/calendar" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <CalendarIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">My Planning</span>}
            </Link>
            <Link href="/classrooms" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <BuildingOffice2Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Concepts</span>}
            </Link>
            <Link href="/recordings" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <VideoCameraIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Videos</span>}
            </Link>
            <Link href="/assignments" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <AcademicCapIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Assignments</span>}
            </Link>
            <Link href="/curriculums" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <ClipboardDocumentListIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Curriculums</span>}
            </Link>
            <Link href="/materials" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <BookOpenIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Library</span>}
            </Link>
            <Link href="/peers" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <UserGroupIcon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="block">Peers</span>}
            </Link>
          </nav>
        </div>
        
        {/* Bottom separator line */}
        <div className="border-t border-gray-200">
          {/* My Profile link below the separator line */}
          <Link href="/profile" className="block px-4 py-3 flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">
            {profilePicture ? (
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 relative">
                <Image 
                  src={profilePicture} 
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <UserCircleIcon className="w-5 h-5 flex-shrink-0" />
            )}
            {isOpen && <span className="block">My Profile</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
