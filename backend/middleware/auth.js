const jwt = require('jsonwebtoken');
const { pool } = require('@config/db');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const student = await pool.query(
        'SELECT * FROM students WHERE id = $1',
        [decoded.studentId]
      );

      if (student.rows.length === 0 || !student.rows[0].is_active) {
        return res.status(401).json({ message: 'Invalid student' });
      }

      req.student = student.rows[0];
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateToken;
