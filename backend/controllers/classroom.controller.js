const Classroom = require('@models/classroom.model');

const classroomController = {
  getAllClassrooms: async (req, res) => {
    try {
      const classrooms = await Classroom.getAll();
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  getClassroomStatus: async (req, res) => {
    try {
      const status = await Classroom.getStatus(req.params.id);
      if (!status) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
      res.json({
        booked: status.booked,
        details: status.booked ? {
          date: status.date,
          day: status.day,
          time: status.time
        } : null
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateClassroomStatus: async (req, res) => {
    try {
      const { booked } = req.body;
      await Classroom.updateStatus(req.params.id, booked);
      res.json({ message: 'Status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = classroomController;
