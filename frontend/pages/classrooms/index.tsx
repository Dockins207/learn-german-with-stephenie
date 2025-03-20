import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { classroomService } from '@/services/classroomService';
import { liveClassroomService } from '@/services/liveClassroomService';
import { classroomLinks } from '@/constants/classroomLinks';

type ClassroomId = '1' | '2' | '3' | '4' | '5' | '6';

interface Classroom {
  id: ClassroomId;
  name: string;
  status: 'empty' | 'booked' | 'live';
  bookingDetails?: {
    day: string;
    time: string;
    level: string;
    topic: string;
  };
  recordingStatus?: {
    isRecording: boolean;
    startedAt: string;
    recordingUrl?: string;
  };
}

const classrooms: Classroom[] = [
  { id: '1', name: '1. Berlin', status: 'empty' },
  { id: '2', name: '2. Munich', status: 'empty' },
  { id: '3', name: '3. Hamburg', status: 'empty' },
  { id: '4', name: '4. Frankfurt', status: 'empty' },
  { id: '5', name: '5. Cologne', status: 'empty' },
  { id: '6', name: '6. Stuttgart', status: 'empty' },
];

export default function Classrooms() {
  const [classroomsState, setClassroomsState] = useState<Classroom[]>(classrooms);
  const [loading, setLoading] = useState(true);

  // Function to update classroom status based on backend signal
  const updateClassroomStatus = (classroomId: ClassroomId, status: 'empty' | 'booked' | 'live', bookingDetails?: { 
    day: string; 
    time: string;
    level: string;
    topic: string;
  }, recordingStatus?: {
    isRecording: boolean;
    startedAt: string;
    recordingUrl?: string;
  }) => {
    setClassroomsState(prev => 
      prev.map(classroom => 
        classroom.id === classroomId ? { ...classroom, status, bookingDetails, recordingStatus } : classroom
      )
    );
  };

  // Fetch classrooms on mount
  useEffect(() => {
    // Initialize with local data immediately
    setClassroomsState(classrooms);
    setLoading(false);

    // Try to fetch from backend in background
    const fetchClassrooms = async () => {
      try {
        const data = await classroomService.getAllClassrooms();
        // Merge backend data with local classroom data
        const updatedClassrooms = classrooms.map(classroom => {
          const backendData = data.find((c: any) => c.id === classroom.id);
          return backendData ? { ...classroom, ...backendData } : classroom;
        });
        setClassroomsState(updatedClassrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);

  // Handle classroom join
  const handleJoinClass = (classroom: Classroom) => {
    // Get the meet link from the configuration
    const meetLink = classroomLinks[classroom.id];
    if (!meetLink) {
      toast.error('Meet link not found for this classroom');
      return;
    }
    // Open the classroom in the same page
    window.location.href = meetLink;
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Loading classrooms...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Classrooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classroomsState.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md p-8 h-56 relative">
              <div className="absolute top-4 left-4">
                <h2 className="text-xl font-semibold text-gray-900">{classroom.name}</h2>
                {classroom.status === 'live' && classroom.bookingDetails && (
                  <div className="text-sm text-gray-600 mt-1">
                    <p>Day: {classroom.bookingDetails.day}</p>
                    <p>Time: {classroom.bookingDetails.time}</p>
                    <p>Level: German {classroom.bookingDetails.level}</p>
                    <p>Topic: {classroom.bookingDetails.topic}</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4">
                <button
                  onClick={() => handleJoinClass(classroom)}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Join Class
                </button>
              </div>
              <div className="absolute bottom-4 right-4">
                <div 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    classroom.status === 'empty' ? 'bg-green-500 text-white' : 
                    classroom.status === 'booked' ? 'bg-red-500 text-white' : 
                    'bg-yellow-500 text-white'
                  }`}
                >
                  {classroom.status === 'empty' ? 'Empty' : 
                   classroom.status === 'booked' ? 'Booked' : 
                   'Live'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}