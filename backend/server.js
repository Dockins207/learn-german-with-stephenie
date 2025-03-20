require('module-alias/register');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize, connectDB } = require('./config/db');
const { verifyToken } = require('./utils/jwt');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT middleware
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    req.user = verifyToken(token);
  }
  next();
});

// Connect to database and sync models
connectDB()
  .then(() => {
    // Initialize models
    const Student = require('@models/student.model')(sequelize);
    const Classroom = require('@models/classroom.model')(sequelize);
    const Attendance = require('@models/attendance.model')(sequelize);

    // Sync models with database
    return sequelize.sync();
  })
  .then(() => {
    console.log('Models synchronized with database');
    
    // Routes
    app.use('/api/auth', require('./routes/auth.routes'));
    app.use('/api/classrooms', require('./routes/classroom.routes'));
    app.use('/api/attendance', require('./routes/attendance.routes'));

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
