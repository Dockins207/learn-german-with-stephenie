import Layout from '@components/Layout';
import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  duration: string;
  date: string;
}

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function Recordings() {
  const [selectedLevel, setSelectedLevel] = useState<typeof levels[number]>('A1');

  // Example video data (will be replaced with backend data)
  const exampleVideos: Video[] = [
    {
      id: '1',
      title: 'Introduction to German Basics',
      description: 'Learn the fundamentals of German grammar and vocabulary',
      url: 'https://example.com/video1',
      level: 'A1',
      duration: '45 min',
      date: '2025-03-07'
    }
  ];

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/recordings/videos');
      const data = await response.json();
      // Update state with fetched videos
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Handle video playback
  const handleVideoPlay = (url: string) => {
    // Implement video playback logic
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Recorded Classes</h1>

        {/* Level Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Level
          </label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg ${
                  selectedLevel === level ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {selectedLevel === 'A1' ? (
          // Video Grid for A1
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`https://via.placeholder.com/640x360?text=${video.title}`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {video.level}
                    </span>
                    <span className="text-sm text-gray-500">{video.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(video.date).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleVideoPlay(video.url)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Coming Soon message for other levels
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-600">Content for {selectedLevel} level is currently being prepared.</p>
            <p className="text-gray-600 mt-1">Please check back later!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}