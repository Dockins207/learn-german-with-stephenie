import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const linkService = {
  // Get encrypted link for a classroom
  getEncryptedLink: async (classroomId: string) => {
    try {
      const response = await axios.get(`${API_URL}/classrooms/${classroomId}/link`);
      return response.data.encryptedLink;
    } catch (error) {
      toast.error('Failed to get classroom link');
      throw error;
    }
  },

  // Validate encrypted link
  validateLink: async (encryptedLink: string) => {
    try {
      const response = await axios.post(`${API_URL}/classrooms/validate-link`, { encryptedLink });
      return response.data.isValid;
    } catch (error) {
      toast.error('Invalid or expired link');
      return false;
    }
  }
};
