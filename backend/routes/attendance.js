const express = require('express');
const router = express.Router();
const attendanceController = require('@controllers/attendance.controller');
const auth = require('@middleware/auth.middleware');

// Attendance routes
// Mark attendance for a classroom
router.post('/:classroomId/mark', auth, attendanceController.markAttendance);

// Get attendance records for a classroom
router.get('/:classroomId', auth, attendanceController.getAttendance);

module.exports = router;
