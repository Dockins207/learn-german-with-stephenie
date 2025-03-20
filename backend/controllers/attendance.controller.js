const Attendance = require('@models/attendance.model');
const Classroom = require('@models/classroom.model');
const Student = require('@models/student.model');
const auth = require('@middleware/auth.middleware');

const attendanceController = {
  markAttendance: async (req, res) => {
    try {
      const { classroomId } = req.params;
      const { studentId } = req.body;
      
      // Check if the classroom exists and is booked
      const classroom = await Classroom.findByPk(classroomId);
      if (!classroom || !classroom.booked) {
        return res.status(404).json({ error: 'Classroom not found or not booked' });
      }

      // Mark attendance
      const attendance = await Attendance.create({
        classroom_id: classroomId,
        student_id: studentId,
        confirmed: true,
        joined: true
      });
      
      res.json({
        message: 'Attendance marked successfully',
        attendance
      });
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ error: 'Failed to mark attendance' });
    }
  },

  getAttendance: async (req, res) => {
    try {
      const { classroomId } = req.params;
      const attendance = await Attendance.findAll({
        where: { classroom_id: classroomId },
        include: [
          {
            model: Classroom,
            as: 'classroom',
            attributes: ['id', 'name']
          },
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'first_name', 'last_name']
          }
        ]
      });
      
      res.json({
        message: 'Attendance retrieved successfully',
        attendance
      });
    } catch (error) {
      console.error('Error getting attendance:', error);
      res.status(500).json({ error: 'Failed to get attendance' });
    }
  }
};

module.exports = attendanceController;
