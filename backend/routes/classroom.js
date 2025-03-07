const express = require('express');
const router = express.Router();
const classroomController = require('@controllers/classroom.controller');

// Get all classrooms with status
router.get('/', classroomController.getAllClassrooms);

// Get specific classroom status
router.get('/:id/status', classroomController.getClassroomStatus);

// Update classroom status
router.put('/:id/status', classroomController.updateClassroomStatus);

module.exports = router;