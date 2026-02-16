import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {
    // Ensure JWT_SECRET is defined
    const { JWT_SECRET } = ENV;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        // httpOnly ensures the cookie is not accessible via JavaScript, enhancing security
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
        secure: ENV.NODE_ENV === 'development' ? false : true, // Set secure flag in production
    });
    return token;
}