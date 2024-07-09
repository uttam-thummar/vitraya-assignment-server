import express from "express";
import rateLimiter from 'express-rate-limit';
import { login, register } from "../controllers/auth.controllers.js";

const router = express.Router();

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes',
    },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

export default router;