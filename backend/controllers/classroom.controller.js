const Classroom = require('@models/classroom.model');
const auth = require('@middleware/auth.middleware');

const classroomController = {
  getAllClassrooms: async (req, res) => {
    try {
      const classrooms = await Classroom.getAll(req.app.get('sequelize'));
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  getClassroomStatus: async (req, res) => {
    try {
      const classroom = await Classroom.getStatus(req.params.id, req.app.get('sequelize'));
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
      res.json(classroom);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroomStatus: async (req, res) => {
    try {
      await Classroom.updateStatus(req.params.id, req.body.booked, req.app.get('sequelize'));
      res.json({ message: 'Status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroomMeetLink: async (req, res) => {
    try {
      await Classroom.updateMeetLink(req.params.id, req.body.meetLink, req.app.get('sequelize'));
      res.json({ message: 'Meet link updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = classroomController;
