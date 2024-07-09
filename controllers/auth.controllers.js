import User from '../models/User.model.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.generateToken();
    return res.status(StatusCodes.CREATED).json({
        user: {
            username: user.username,
            email: user.email,
            token
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please privde credentials');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials');
    }

    const token = user.generateToken();
    return res.status(StatusCodes.OK).json({
        user: {
            username: user.username,
            email: user.email,
            token
        }
    });
}

export { login, register };