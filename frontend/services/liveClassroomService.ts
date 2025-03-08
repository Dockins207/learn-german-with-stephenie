import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const liveClassroomService = {
  // Start recording a class
  startRecording: async (classroomId: string) => {
    try {
      const response = await axios.post(`${API_URL}/classrooms/${classroomId}/record`);
      toast.success('Recording started successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to start recording');
      throw error;
    }
  },

  // Stop recording a class
  stopRecording: async (classroomId: string) => {
    try {
      const response = await axios.post(`${API_URL}/classrooms/${classroomId}/stop-recording`);
      toast.success('Recording stopped successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to stop recording');
      throw error;
    }
  },

  // Get recording status
  getRecordingStatus: async (classroomId: string) => {
    try {
      const response = await axios.get(`${API_URL}/classrooms/${classroomId}/recording-status`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch recording status');
      throw error;
    }
  }
};
