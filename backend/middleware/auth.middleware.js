const jwt = require('jsonwebtoken');
const AuthService = require('@services/auth.service');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            req.student = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Authentication error', error: error.message });
    }
};

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.student || !req.student.role) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.student.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};

module.exports = {
    authMiddleware,
    roleMiddleware
};
