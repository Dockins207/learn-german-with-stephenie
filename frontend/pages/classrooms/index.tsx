import Layout from '@components/Layout';

interface Classroom {
  id: string;
  name: string;
  meetLink: string;
}

const classrooms: Classroom[] = [
  { id: '1', name: 'Berlin', meetLink: 'https://meet.google.com/ndr-seek-gth' },
  { id: '2', name: 'Munich', meetLink: 'https://meet.google.com/abc2' },
  { id: '3', name: 'Hamburg', meetLink: 'https://meet.google.com/abc3' },
  { id: '4', name: 'Frankfurt', meetLink: 'https://meet.google.com/abc4' },
  { id: '5', name: 'Cologne', meetLink: 'https://meet.google.com/abc5' },
  { id: '6', name: 'Stuttgart', meetLink: 'https://meet.google.com/abc6' },
  { id: '7', name: 'Bremen', meetLink: 'https://meet.google.com/abc7' },
  { id: '8', name: 'Dresden', meetLink: 'https://meet.google.com/abc8' },
  { id: '9', name: 'Leipzig', meetLink: 'https://meet.google.com/abc9' },
  { id: '10', name: 'Düsseldorf', meetLink: 'https://meet.google.com/abc10' },
  { id: '11', name: 'Heidelberg', meetLink: 'https://meet.google.com/abc11' },
  { id: '12', name: 'Nuremberg', meetLink: 'https://meet.google.com/abc12' },
];

export default function Classrooms() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Classrooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md p-8 h-48 relative">
              <div className="absolute top-4 left-4">
                <h2 className="text-xl font-semibold text-gray-900">{classroom.name}</h2>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}