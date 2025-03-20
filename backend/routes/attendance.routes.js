const express = require('express');
const router = express.Router();
const AttendanceController = require('@controllers/attendance.controller');
const { authMiddleware } = require('@middleware/auth.middleware');

// Mark attendance for a classroom
router.post('/:classroomId/mark', authMiddleware, AttendanceController.markAttendance);

// Get attendance records for a classroom
router.get('/:classroomId', authMiddleware, AttendanceController.getAttendance);

module.exports = router;
