import {verifyToken} from './auth.js';
import {verifyEmail} from './verifySignUp.js';

export const auth = (req, res, next) => {
    verifyToken(req, res, next);
};

export const verifySignUp = (req, res) => {
    verifyEmail(req, res);
};