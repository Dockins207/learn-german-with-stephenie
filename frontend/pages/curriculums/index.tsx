import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { API_URL } from '@/utils/auth';
import { 
  Card, 
  Typography, 
  CircularProgress, 
  Button, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CurriculumLesson {
  id: number;
  title: string;
  description: string;
  order: number;
}

interface CurriculumModule {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: CurriculumLesson[];
}

interface Curriculum {
  id: number;
  title: string;
  description: string;
  level: string;
  modules: CurriculumModule[];
}

const CurriculumsPage = () => {
  const [loading, setLoading] = useState(true);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const { student, token: authToken } = useAuth();

  // First useEffect just for authentication check
  useEffect(() => {
    // Check if we have the token in localStorage
    const storedToken = localStorage.getItem('token');
    
    console.log('Auth check - Student:', student);
    console.log('Auth check - Context Token:', authToken);
    console.log('Auth check - LocalStorage Token:', storedToken ? 'Present' : 'Missing');
    
    // Only redirect if both context auth and localStorage token are missing
    if (!student && !storedToken) {
      console.log('No authentication found, redirecting to login...');
      router.push('/auth/login');
      return;
    }
    
    // If we have a token, proceed with data loading
    setAuthChecked(true);
  }, [student, authToken, router]);

  // Second useEffect for data fetching, only runs after auth is confirmed
  useEffect(() => {
    if (!authChecked) {
      return; // Don't fetch data until auth is confirmed
    }
    
    const token = localStorage.getItem('token') || authToken;
    if (!token) {
      console.warn('No token found for API calls, redirecting to login...');
      router.push('/auth/login');
      return;
    }

    const fetchCurriculums = async () => {
      try {
        console.log('Fetching curriculums with token:', token ? token.substring(0, 10) + '...' : 'missing');
        
        const response = await fetch(`${API_URL}/api/curriculums`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Curriculums fetch response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Curriculums fetch error response:', errorText);
          throw new Error(`Failed to fetch curriculums: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Curriculums data received:', data);
        setCurriculums(data.curriculums || []);
        
        // Store token in localStorage if it's not there yet but we got valid data
        if (!localStorage.getItem('token') && authToken) {
          localStorage.setItem('token', authToken);
        }
      } catch (error: any) {
        console.error('Error fetching curriculums:', error);
        setError(error.message || 'Failed to load curriculums');
        
        // Only redirect on auth errors (401, 403)
        if (error.message && (error.message.includes('401') || error.message.includes('403'))) {
          console.log('Authentication error detected, redirecting to login');
          localStorage.removeItem('token'); // Clear invalid token
          router.push('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculums();
  }, [authChecked, authToken, router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Typography variant="h6" color="error">{error}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Typography variant="h4">German Language Curriculums</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Explore our structured learning paths
            </Typography>
          </div>

          {curriculums.length === 0 ? (
            <Card className="p-6 text-center">
              <Typography variant="h6">No curriculums available at the moment.</Typography>
              <Typography variant="body1" color="textSecondary" className="mt-2">
                Please check back later or contact your instructor.
              </Typography>
            </Card>
          ) : (
            <div className="space-y-6">
              {curriculums.map((curriculum) => (
                <Card key={curriculum.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <Typography variant="h5">{curriculum.title}</Typography>
                      <Chip 
                        label={curriculum.level} 
                        color={
                          curriculum.level.includes('A1') || curriculum.level.includes('A2') ? 'success' :
                          curriculum.level.includes('B1') || curriculum.level.includes('B2') ? 'primary' : 
                          'secondary'
                        } 
                        size="small" 
                      />
                    </div>
                    <Typography variant="body1" className="mt-2">{curriculum.description}</Typography>
                  </div>
                  
                  <Divider />
                  
                  <div className="px-6 py-2">
                    <Typography variant="subtitle2" color="textSecondary">Modules</Typography>
                  </div>
                  
                  {curriculum.modules.map((module) => (
                    <Accordion key={module.id} disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="px-6"
                      >
                        <Typography>{module.order}. {module.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className="px-6 pt-0 pb-4">
                        <Typography variant="body2" className="mb-3 text-gray-600">
                          {module.description}
                        </Typography>
                        
                        <Typography variant="subtitle2" className="mt-4 mb-2">Lessons:</Typography>
                        
                        <div className="pl-4">
                          {module.lessons.map((lesson) => (
                            <div key={lesson.id} className="mb-2">
                              <Typography variant="body2">
                                {lesson.order}. {lesson.title}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CurriculumsPage;
