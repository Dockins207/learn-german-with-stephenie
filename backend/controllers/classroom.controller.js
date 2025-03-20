const Classroom = require('@models/classroom.model');
const { authMiddleware } = require('@middleware/auth.middleware');

const classroomController = {
  getAllClassrooms: async (req, res) => {
    try {
      const classrooms = await Classroom.findAll({
        order: [['day', 'ASC'], ['time', 'ASC']],
        attributes: ['id', 'name', 'booked', 'date', 'day', 'time', 'meet_link']
      });
      res.json(classrooms);
    } catch (error) {
      console.error('Error in getAllClassrooms:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getClassroomStatus: async (req, res) => {
    try {
      const classroom = await Classroom.findByPk(req.params.classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
      res.json(classroom);
    } catch (error) {
      console.error('Error in getClassroomStatus:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroomStatus: async (req, res) => {
    try {
      const classroom = await Classroom.findByPk(req.params.classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }

      classroom.booked = req.body.status;
      await classroom.save();

      res.json(classroom);
    } catch (error) {
      console.error('Error in updateClassroomStatus:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroomMeetLink: async (req, res) => {
    try {
      const classroom = await Classroom.findByPk(req.params.classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }

      classroom.meet_link = req.body.meetLink;
      await classroom.save();

      res.json(classroom);
    } catch (error) {
      console.error('Error in updateClassroomMeetLink:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroom: async (req, res) => {
    try {
      const classroom = await Classroom.findByPk(req.params.classroomId);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }

      await classroom.update(req.body);
      res.json(classroom);
    } catch (error) {
      console.error('Error in updateClassroom:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = classroomController;
