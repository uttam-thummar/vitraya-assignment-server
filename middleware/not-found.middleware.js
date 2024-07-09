import { StatusCodes } from "http-status-codes";

const NotFoundMiddleware = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).send('Route does not exist');
}

export default NotFoundMiddleware;