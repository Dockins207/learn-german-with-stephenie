import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const classroomService = {
  // Get all classrooms with status
  getAllClassrooms: async () => {
    try {
      const response = await axios.get(`${API_URL}/classroom`);
      // Map the response data to match our frontend structure
      return response.data.map((classroom: any) => ({
        id: classroom.id,
        name: classroom.name,
        status: classroom.booked ? 'booked' : 'empty',
        bookingDetails: classroom.date ? {
          day: classroom.day,
          time: classroom.time,
          level: 'A1', // Default level
          topic: 'General German' // Default topic
        } : undefined
      }));
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      throw error;
    }
  },

  // Get specific classroom status
  getClassroomStatus: async (classroomId: string) => {
    try {
      const response = await axios.get(`${API_URL}/classroom/${classroomId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching classroom status:', error);
      toast.error('Failed to fetch classroom status');
      throw error;
    }
  },

  // Update classroom status
  updateClassroomStatus: async (classroomId: string, status: boolean) => {
    try {
      await axios.put(`${API_URL}/classroom/${classroomId}/status`, { booked: status });
    } catch (error) {
      console.error('Error updating classroom status:', error);
      toast.error('Failed to update classroom status');
      throw error;
    }
  },

  // Update classroom meet link
  updateClassroomMeetLink: async (classroomId: string, meetLink: string) => {
    try {
      await axios.put(`${API_URL}/classroom/${classroomId}/meet-link`, { meetLink });
    } catch (error) {
      console.error('Error updating classroom meet link:', error);
      toast.error('Failed to update classroom meet link');
      throw error;
    }
  },

  // Mark attendance for a classroom
  markAttendance: async (classroomId: string, studentId: string) => {
    try {
      const response = await axios.post(`${API_URL}/attendance/${classroomId}`, { studentId });
      toast.success('Attendance marked successfully');
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
      throw error;
    }
  },

  // Get attendance records for a classroom
  getAttendance: async (classroomId: string) => {
    try {
      const response = await axios.get(`${API_URL}/attendance/${classroomId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      toast.error('Failed to fetch attendance records');
      throw error;
    }
  }
};
