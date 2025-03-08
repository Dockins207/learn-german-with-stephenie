import Layout from '@components/Layout';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Classroom {
  id: string;
  name: string;
  meetLink: string;
  status: 'empty' | 'booked';
  bookingDetails?: {
    day: string;
    time: string;
    level: string;
    topic: string;
  };
}

const classrooms: Classroom[] = [
  { id: '1', name: '1. Berlin', meetLink: 'https://meet.google.com/ndr-seek-gth', status: 'empty' },
  { id: '2', name: '2. Munich', meetLink: 'https://meet.google.com/gia-eoep-ygc', status: 'empty' },
  { id: '3', name: '3. Hamburg', meetLink: 'https://meet.google.com/ota-yqbw-xff', status: 'empty' },
  { id: '4', name: '4. Frankfurt', meetLink: 'https://meet.google.com/uyh-opkh-ueb', status: 'empty' },
  { id: '5', name: '5. Cologne', meetLink: 'https://meet.google.com/nbp-hetn-sst', status: 'empty' },
  { id: '6', name: '6. Stuttgart', meetLink: 'https://meet.google.com/ozv-iafc-jxp', status: 'empty' },
];

export default function Classrooms() {
  const [classroomsState, setClassroomsState] = useState(classrooms);

  // Function to update classroom status based on backend signal
  const updateClassroomStatus = (classroomId: string, status: 'empty' | 'booked', bookingDetails?: { 
    day: string; 
    time: string;
    level: string;
    topic: string;
  }) => {
    setClassroomsState(prev => 
      prev.map(classroom => 
        classroom.id === classroomId ? { ...classroom, status, bookingDetails } : classroom
      )
    );
  };

  // Example of how to listen for backend signals
  // In a real application, you would replace this with your actual backend signal listener
  useEffect(() => {
    // Example: Listen for WebSocket messages or API updates
    // const socket = new WebSocket('your-backend-url');
    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   updateClassroomStatus(data.classroomId, data.status, data.bookingDetails);
    // };

    // For demonstration, we'll simulate a backend update after 2 seconds
    setTimeout(() => {
      // Example: Update classroom 1 to booked
      updateClassroomStatus('1', 'booked', { 
        day: 'Monday', 
        time: '10:00 AM', 
        level: 'A1', 
        topic: 'Basic Greetings and Introductions'
      });
    }, 2000);

    return () => {
      // Clean up the listener when component unmounts
      // socket.close();
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Classrooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classroomsState.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md p-8 h-56 relative">
              <div className="absolute top-4 left-4">
                <h2 className="text-xl font-semibold text-gray-900">{classroom.name}</h2>
                {classroom.status === 'booked' && classroom.bookingDetails && (
                  <div className="text-sm text-gray-600 mt-1">
                    <p>Day: {classroom.bookingDetails.day}</p>
                    <p>Time: {classroom.bookingDetails.time}</p>
                    <p>Level: German {classroom.bookingDetails.level}</p>
                    <p>Topic: {classroom.bookingDetails.topic}</p>
                  </div>
                )}
              </div>
              {classroom.status === 'booked' && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => {
                      toast.success('Attendance confirmed!');
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Confirm Attendance
                  </button>
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <a
                  href={classroom.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Join Class
                </a>
              </div>
              <div className="absolute bottom-4 right-4">
                <div 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    classroom.status === 'empty' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {classroom.status === 'empty' ? 'Empty' : 'Booked'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}