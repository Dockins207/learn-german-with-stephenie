import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuth } from '@/context/AuthContext';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { student, token } = getServerAuth();

    if (!student || !token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    res.status(200).json({
      student: {
        id: student.id,
        email: student.email,
        first_name: student.first_name,
        last_name: student.last_name,
        role: student.role
      }
    });
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
