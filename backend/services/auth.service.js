const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('@config/db');
const { Op } = require('sequelize');
const Student = require('@models/student.model')(sequelize);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

const generateToken = (student) => {
  return {
    access_token: jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: student.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    ),
    refresh_token: jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: student.role
      },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    )
  };
};

class AuthService {
    async register(studentData) {
        try {
            // Check if email already exists
            const existingStudent = await Student.findOne({
                where: {
                    email: studentData.email
                }
            });

            if (existingStudent) {
                throw new Error('Email already exists');
            }

            // Create new student with password_hash
            const student = await Student.create({
                email: studentData.email,
                password_hash: studentData.password_hash, // Use the hashed password from the request
                first_name: studentData.first_name,
                last_name: studentData.last_name
            });

            // Generate JWT token
            const tokens = generateToken(student);

            return {
                student: {
                    id: student.id,
                    email: student.email,
                    first_name: student.first_name,
                    last_name: student.last_name,
                    role: student.role
                },
                ...tokens
            };
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const student = await Student.findOne({
                where: {
                    email
                }
            });

            if (!student) {
                throw new Error('Invalid email or password');
            }

            const isValidPassword = await student.validatePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            const tokens = generateToken(student);

            return {
                student: {
                    id: student.id,
                    email: student.email,
                    first_name: student.first_name,
                    last_name: student.last_name,
                    role: student.role
                },
                ...tokens
            };
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_SECRET);
            const student = await Student.findByPk(decoded.id);

            if (!student) {
                throw new Error('Student not found');
            }

            const tokens = generateToken(student);
            return tokens;
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async getProfile(studentId) {
        try {
            const student = await Student.findOne({
                where: { id: studentId },
                attributes: { exclude: ['password_hash'] }
            });

            if (!student) {
                throw new Error('Student not found');
            }

            return {
                id: student.id,
                email: student.email,
                first_name: student.first_name,
                last_name: student.last_name,
                role: student.role
            };
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(studentId, updates) {
        try {
            const student = await Student.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }

            await student.update(updates);
            return student;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
