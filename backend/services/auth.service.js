const jwt = require('jsonwebtoken');
const User = require('@models/user.model');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

class AuthService {
    async register(userData) {
        try {
            // Check if email already exists
            const existingUser = await User.findOne({
                where: {
                    email: userData.email
                }
            });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Check if first name and last name are provided
            if (!userData.firstName || !userData.lastName) {
                throw new Error('First name and last name are required');
            }

            // Create new user
            const user = await User.create(userData);

            // Generate JWT token
            const token = this.generateToken(user);

            return {
                user: user.toJSON(),
                token
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(credentials) {
        try {
            // Find user by email
            const user = await User.findOne({
                where: {
                    email: credentials.email
                }
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Validate password
            const isValidPassword = await user.validatePassword(credentials.password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = this.generateToken(user);

            return {
                user: user.toJSON(),
                token
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user.toJSON();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUser(userId, updates) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }

            await user.update(updates);
            return user.toJSON();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new AuthService();
