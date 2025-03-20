const AuthService = require('@services/auth.service');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('@middleware/auth.middleware');

class AuthController {
    // Register new student
    async register(req, res) {
        try {
            const { email, password, first_name, last_name } = req.body;
            
            if (!email || !password || !first_name || !last_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                    fields: ['email', 'password', 'first_name', 'last_name']
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Validate password strength
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters long'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create student with hashed password
            const result = await AuthService.register({
                email,
                password_hash: hashedPassword,
                first_name,
                last_name
            });

            res.status(201).json({
                success: true,
                message: 'Student registered successfully',
                student: result.student,
                token: result.access_token,
                refreshToken: result.refresh_token
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Registration failed'
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                    fields: ['email', 'password']
                });
            }

            const result = await AuthService.login(email, password);
            
            res.json({
                success: true,
                token: result.access_token,
                refreshToken: result.refresh_token,
                student: result.student
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(401).json({
                success: false,
                message: error.message || 'Invalid email or password'
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const { refresh_token } = req.body;
            if (!refresh_token) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required'
                });
            }

            const tokens = await AuthService.refreshToken(refresh_token);
            res.json({
                success: true,
                ...tokens
            });
        } catch (error) {
            console.error('Refresh token error:', error);
            res.status(401).json({
                success: false,
                message: error.message || 'Invalid refresh token'
            });
        }
    }

    async getProfile(req, res) {
        try {
            const result = await AuthService.getProfile(req.student.id);
            res.json({
                success: true,
                student: result
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(404).json({
                success: false,
                message: error.message || 'Student not found'
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const { first_name, last_name, email } = req.body;
            
            // Validate email if provided
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email format'
                    });
                }
            }

            const result = await AuthService.updateProfile(req.student.id, {
                first_name,
                last_name,
                email: email || undefined // Only update email if provided
            });

            res.json({
                success: true,
                message: 'Profile updated successfully',
                student: {
                    id: result.id,
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    role: result.role
                }
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to update profile'
            });
        }
    }
}

module.exports = new AuthController();
