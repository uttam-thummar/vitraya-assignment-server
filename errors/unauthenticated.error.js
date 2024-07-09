import { StatusCodes } from "http-status-codes";
import CustomErrorAPI from "./custom.error.js";

class UnauthenticatedError extends CustomErrorAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;