import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="ml-4 text-2xl font-bold text-gray-800">LGwS</h1>
      </div>
      <div className="flex-1"></div>
      <div className="w-14"></div> {/* Balance the header */}
    </header>
  );
};

export default Header;
