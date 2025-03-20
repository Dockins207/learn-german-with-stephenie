const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('@config/db');
const authenticateToken = require('@middleware/auth');
const { generateToken } = require('@utils/jwt');

// Register new student
router.post('/register', async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    // Check if student already exists
    const existingStudent = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const result = await pool.query(
      'INSERT INTO students (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, hashedPassword, first_name, last_name, 'student']
    );

    // Generate JWT token
    const token = generateToken({ studentId: result.rows[0].id });
    res.status(201).json({
      token,
      student: {
        id: result.rows[0].id,
        email,
        first_name,
        last_name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    if (student.rows.length === 0 || !student.rows[0].is_active) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, student.rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({ studentId: student.rows[0].id });
    res.json({
      token,
      student: {
        id: student.rows[0].id,
        email,
        first_name: student.rows[0].first_name,
        last_name: student.rows[0].last_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get student profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      student: {
        id: req.student.id,
        email: req.student.email,
        first_name: req.student.first_name,
        last_name: req.student.last_name
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

module.exports = router;
