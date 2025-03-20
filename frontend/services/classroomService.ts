import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const classroomService = {
  // Get all classrooms with status
  getAllClassrooms: async () => {
    try {
      const response = await axios.get(`${API_URL}/classrooms`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch classrooms');
      throw error;
    }
  },

  // Get specific classroom status
  getClassroomStatus: async (classroomId: string) => {
    try {
      const response = await axios.get(`${API_URL}/classrooms/${classroomId}/status`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch classroom status');
      throw error;
    }
  },

  // Update classroom status
  updateClassroomStatus: async (classroomId: string, status: boolean) => {
    try {
      await axios.put(`${API_URL}/classrooms/${classroomId}/status`, { booked: status });
    } catch (error) {
      toast.error('Failed to update classroom status');
      throw error;
    }
  },

  // Update classroom meet link
  updateClassroomMeetLink: async (classroomId: string, meetLink: string) => {
    try {
      await axios.put(`${API_URL}/classrooms/${classroomId}/meet-link`, { meetLink });
    } catch (error) {
      toast.error('Failed to update classroom meet link');
      throw error;
    }
  },

  // Mark attendance for a classroom
  markAttendance: async (classroomId: string, studentId: string) => {
    try {
      const response = await axios.post(`${API_URL}/attendance/${classroomId}/mark`, { studentId });
      toast.success('Attendance marked successfully');
      return response.data;
    } catch (error) {
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
      toast.error('Failed to fetch attendance records');
      throw error;
    }
  }
};
