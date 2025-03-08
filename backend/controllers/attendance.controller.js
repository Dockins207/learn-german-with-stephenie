const Attendance = require('@models/attendance.model');
const auth = require('@middleware/auth.middleware');

const attendanceController = {
  markAttendance: async (req, res) => {
    try {
      const { classroomId } = req.params;
      const { studentId } = req.body;
      
      // Check if the classroom exists and is booked
      const classroom = await Classroom.getStatus(classroomId);
      if (!classroom || !classroom.booked) {
        return res.status(404).json({ error: 'Classroom not found or not booked' });
      }

      // Mark attendance
      const attendance = await Attendance.mark(classroomId, studentId);
      
      res.json({
        message: 'Attendance marked successfully',
        attendance
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAttendance: async (req, res) => {
    try {
      const { classroomId } = req.params;
      
      // Get attendance records for the classroom
      const attendance = await Attendance.get(classroomId);
      
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = attendanceController;
