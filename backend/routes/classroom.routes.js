const express = require('express');
const router = express.Router();
const ClassroomController = require('@controllers/classroom.controller');
const { authMiddleware } = require('@middleware/auth.middleware');

// Get all classrooms
router.get('/', ClassroomController.getAllClassrooms);

// Get classroom status
router.get('/:classroomId/status', ClassroomController.getClassroomStatus);

// Update classroom status
router.put('/:classroomId/status', authMiddleware, ClassroomController.updateClassroomStatus);

// Update classroom meet link
router.put('/:classroomId/meet-link', authMiddleware, ClassroomController.updateClassroomMeetLink);

// Update classroom
router.put('/:classroomId', authMiddleware, ClassroomController.updateClassroom);

module.exports = router;
