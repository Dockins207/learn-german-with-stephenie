import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Classrooms() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Classrooms</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Classroom Functionality Removed
            </h2>
            <p className="text-gray-600 mb-6">
              The classroom feature has been removed from this application.
              Please contact your administrator for more information.
            </p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}