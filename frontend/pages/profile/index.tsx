import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, Typography, CircularProgress, Button, TextField, Snackbar, Alert } from '@mui/material';
import { API_URL } from '@/utils/auth';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [classroomLink, setClassroomLink] = useState('');
  const router = useRouter();
  const { student, token: authToken } = useAuth();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
    
    // If we have a token, proceed with profile loading
    setAuthChecked(true);
  }, [student, authToken, router]);

  // Second useEffect for data fetching, only runs after auth is confirmed
  useEffect(() => {
    if (!authChecked) {
      return; // Don't fetch profile until auth is confirmed
    }

    const token = localStorage.getItem('token') || authToken;
    if (!token) {
        console.warn('No token found for API calls, redirecting to login...');
        router.push('/auth/login');
        return;
    }

    const fetchProfile = async () => {
        try {
            console.log('Fetching profile with token:', token ? token.substring(0, 10) + '...' : 'missing');
            
            const response = await fetch(`${API_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Profile fetch response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Profile fetch error response:', errorText);
                throw new Error(`Failed to fetch profile: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Profile data received:', data);

            if (data.student) {
                setProfileData(data.student);
                setFirstName(data.student.first_name || '');
                setLastName(data.student.last_name || '');
                
                // Store token in localStorage if it's not there yet but we got valid data
                if (!localStorage.getItem('token') && authToken) {
                    localStorage.setItem('token', authToken);
                }
            } else {
                throw new Error('Invalid profile data: student object missing');
            }

            // Fetch classroom link
            try {
                const linkResponse = await fetch(`${API_URL}/api/classroom-link`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (linkResponse.ok) {
                    const { link } = await linkResponse.json();
                    console.log('Classroom Link:', link);
                    setClassroomLink(link);
                } else {
                    console.warn('Failed to fetch classroom link:', linkResponse.status);
                    setClassroomLink('Not available');
                }
            } catch (linkError) {
                console.error('Error fetching classroom link:', linkError);
                setClassroomLink('Error loading link');
            }
        } catch (error: any) {
            console.error('Profile fetch error:', error);
            setSnackbarOpen(true);
            setSnackbarMessage(error.message || 'Failed to fetch profile');
            
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

    fetchProfile();
  }, [authChecked, authToken, router]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No token found, redirecting to login...');
            window.location.href = '/auth/login';
            return;
        }
        const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName }),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const data = await response.json();
        setSnackbarOpen(true);
        setSnackbarMessage('Profile updated successfully');
        setProfileData({
            ...profileData!,
            first_name: data.student.first_name,
            last_name: data.student.last_name,
        });
        setShowUpdateForm(false);
    } catch (error: any) {
        setSnackbarOpen(true);
        setSnackbarMessage(error.message || 'Failed to update profile');
        // Optionally redirect to login on error
        window.location.href = '/auth/login';
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen">
                <CircularProgress />
            </div>
        </Layout>
    );
  }

  if (!profileData) {
    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Typography variant="h6" color="error">Failed to load profile data</Typography>
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
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <Typography variant="h4">Profile</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Your personal information</Typography>
                </div>

                <Card className="shadow-sm p-6">
                    <div className="space-y-6">
                        <div>
                            <Typography variant="h6" className="block mb-1">Full Name</Typography>
                            <Typography>{profileData.first_name} {profileData.last_name}</Typography>
                        </div>

                        <div>
                            <Typography variant="h6" className="block mb-1">Email</Typography>
                            <Typography>{profileData.email}</Typography>
                        </div>

                        <div>
                            <Typography variant="h6" className="block mb-1">Role</Typography>
                            <Typography>{profileData.role}</Typography>
                        </div>

                        <div>
                            <Typography variant="h6" className="block mb-1">Classroom Link</Typography>
                            <Typography>{classroomLink}</Typography>
                        </div>

                        <div className="flex justify-between items-center">
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => setShowUpdateForm(!showUpdateForm)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {showUpdateForm ? 'Cancel Update' : 'Update Profile'}
                            </Button>

                            <Button
                                variant="text"
                                color="error"
                                onClick={() => router.push('/auth/login')}
                            >
                                Logout
                            </Button>
                        </div>

                        {showUpdateForm && (
                            <div className="mt-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <TextField
                                            label="First Name"
                                            value={firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />

                                        <TextField
                                            label="Last Name"
                                            value={lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
        >
            <Alert severity={snackbarMessage === 'Profile updated successfully' ? 'success' : 'error'} variant="filled">
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Layout>
  );
};

export default ProfilePage;
