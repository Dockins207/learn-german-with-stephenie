import Layout from '@components/Layout';

interface Classroom {
  id: string;
  name: string;
  meetLink: string;
}

const classrooms: Classroom[] = [
  { id: '1', name: 'Classroom 1', meetLink: 'https://meet.google.com/ndr-seek-gth' },
  { id: '2', name: 'Classroom 2', meetLink: 'https://meet.google.com/abc2' },
  { id: '3', name: 'Classroom 3', meetLink: 'https://meet.google.com/abc3' },
  { id: '4', name: 'Classroom 4', meetLink: 'https://meet.google.com/abc4' },
  { id: '5', name: 'Classroom 5', meetLink: 'https://meet.google.com/abc5' },
  { id: '6', name: 'Classroom 6', meetLink: 'https://meet.google.com/abc6' },
  { id: '7', name: 'Classroom 7', meetLink: 'https://meet.google.com/abc7' },
  { id: '8', name: 'Classroom 8', meetLink: 'https://meet.google.com/abc8' },
  { id: '9', name: 'Classroom 9', meetLink: 'https://meet.google.com/abc9' },
  { id: '10', name: 'Classroom 10', meetLink: 'https://meet.google.com/abc10' },
];

export default function Classrooms() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Classrooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{classroom.name}</h2>
              <a
                href={classroom.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Class
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}