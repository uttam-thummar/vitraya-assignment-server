import { StatusCodes } from 'http-status-codes';

const ErrorHandlerMiddleware = (err, req, res, next) => {
    let errorDefaults = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again later.'
    }

    if (err.name === 'ValidationError') {
        errorDefaults.message = Object.values(err.errors).map((item) => item.message).join(', ');
        errorDefaults.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        errorDefaults.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        errorDefaults.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === 'CastError') {
        errorDefaults.message = `No item found with id : ${err.value}`;
        errorDefaults.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(errorDefaults.statusCode).json({ message: errorDefaults.message });
}

export default ErrorHandlerMiddleware;