import Layout from '@components/Layout';
import { useState } from 'react';

interface Event {
  id: string;
  date: string;
  title: string;
  time: string;
  type: 'class' | 'quiz' | 'assignment';
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 7)); // March 7, 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // Example events data (will be replaced with backend data)
  const exampleEvents: Event[] = [
    {
      id: '1',
      date: '2025-03-07',
      title: 'German A1 Class',
      time: '13:00 - 14:30',
      type: 'class'
    },
    {
      id: '2',
      date: '2025-03-14',
      title: 'Grammar Quiz',
      time: '15:00 - 16:00',
      type: 'quiz'
    },
    {
      id: '3',
      date: '2025-03-21',
      title: 'Vocabulary Assignment',
      time: '17:00 - 18:00',
      type: 'assignment'
    }
  ];

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/calendar/events?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`);
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  // Handle event creation
  const handleCreateEvent = async (date: string) => {
    try {
      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          title: '',
          time: '',
          type: 'class'
        }),
      });
      const data = await response.json();
      setEvents([...events, data.event]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Get first day of the month
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay();

  // Get last day of the month
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const lastDayOfWeek = lastDay.getDay();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Calendar & Schedule</h1>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setCurrentDate(prev => {
                const newDate = new Date(prev);
                newDate.setMonth(prev.getMonth() - 1);
                return newDate;
              });
              fetchEvents();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            Previous Month
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => {
              setCurrentDate(prev => {
                const newDate = new Date(prev);
                newDate.setMonth(prev.getMonth() + 1);
                return newDate;
              });
              fetchEvents();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            Next Month
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Empty days before first day of month */}
            {[...Array(firstDayOfWeek)].map((_, index) => (
              <div key={index} className="bg-gray-50 min-h-[100px]" />
            ))}

            {/* Days of the month */}
            {[...Array(lastDay.getDate())].map((_, index) => {
              const day = index + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isToday = date.toDateString() === new Date().toDateString();
              const hasEvent = events.some(event => event.date === date.toISOString().split('T')[0]);

              return (
                <div
                  key={day}
                  className={`min-h-[100px] p-2 cursor-pointer ${
                    isToday ? 'bg-blue-50' : 'bg-white'
                  } ${
                    selectedDate === date.toISOString().split('T')[0] ? 'border-2 border-blue-500' : ''
                  } ${
                    hasEvent ? 'border-b-2 border-blue-500' : ''
                  }`}
                  onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${
                      day === 7 ? 'text-blue-600 font-semibold' : 'text-gray-600'
                    }`}>{day}</span>
                    {hasEvent && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  {hasEvent && (
                    <div className="mt-2">
                      <div className="bg-blue-50 text-blue-700 text-xs p-1 rounded">
                        {events.find(event => event.date === date.toISOString().split('T')[0])?.title}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Empty days after last day of month */}
            {[...Array(6 - lastDayOfWeek)].map((_, index) => (
              <div key={index} className="bg-gray-50 min-h-[100px]" />
            ))}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Date: {new Date(selectedDate).toLocaleDateString()}</h2>
            
            {/* Events for Selected Date */}
            <div className="space-y-4">
              {events
                .filter(event => event.date === selectedDate)
                .map(event => (
                  <div key={event.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.type === 'class' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'quiz' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.type === 'class' ? 'Class' : event.type === 'quiz' ? 'Quiz' : 'Assignment'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add New Event Button */}
            <button
              onClick={() => handleCreateEvent(selectedDate)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add New Event
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
