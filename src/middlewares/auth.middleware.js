import jwt from 'jsonwebtoken';
import { SECRRET_KEY } from '../config/app.config.js';
/**
 * @description Middleware to verify if the token is valid
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns {object} - Status code and message
 */
export default (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, SECRRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }

        req.auth = decoded;
        return next();
    });

};
