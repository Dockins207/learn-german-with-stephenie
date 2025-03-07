const AuthService = require('@services/auth.service');
const { authMiddleware } = require('@middleware/auth.middleware');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { email, password, first_name, last_name } = req.body;
            
            if (!email || !password || !first_name || !last_name) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    fields: ['email', 'password', 'first_name', 'last_name']
                });
            }

            const result = await AuthService.register({
                email,
                password,
                first_name,
                last_name
            });

            res.status(201).json({
                message: 'User registered successfully',
                user: result.user,
                token: result.token
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
                error: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    }

    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    fields: ['email', 'password']
                });
            }

            const result = await AuthService.login({
                email,
                password
            });

            res.json({
                message: 'Login successful',
                user: result.user,
                token: result.token
            });
        } catch (error) {
            res.status(401).json({
                message: error.message,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        }
    }

    // Get current user profile
    async getProfile(req, res) {
        try {
            const user = await AuthService.getUserById(req.user.id);
            res.json({
                message: 'Profile retrieved successfully',
                user
            });
        } catch (error) {
            res.status(401).json({
                message: error.message,
                error: error instanceof Error ? error.message : 'Failed to retrieve profile'
            });
        }
    }

    // Update user profile
    async updateProfile(req, res) {
        try {
            const updates = req.body;
            const user = await AuthService.updateUser(req.user.id, updates);
            res.json({
                message: 'Profile updated successfully',
                user
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
                error: error instanceof Error ? error.message : 'Failed to update profile'
            });
        }
    }
}

module.exports = new AuthController();
