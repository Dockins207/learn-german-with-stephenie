const express = require('express');
const router = express.Router();

// Attendance routes
router.get('/', (req, res) => {
  res.json({ message: 'Attendance endpoint' });
});

module.exports = router;
