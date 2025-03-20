const express = require('express');
const router = express.Router();
const classroomController = require('@controllers/classroom.controller');
const auth = require('@middleware/auth.middleware');

// Get all classrooms with status
router.get('/', classroomController.getAllClassrooms);

// Get specific classroom status
router.get('/:id/status', classroomController.getClassroomStatus);

// Update classroom status
router.put('/:id/status', auth, classroomController.updateClassroomStatus);

// Update classroom meet link
router.put('/:id/meet-link', auth, classroomController.updateClassroomMeetLink);

module.exports = router;