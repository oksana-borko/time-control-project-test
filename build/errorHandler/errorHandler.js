import { HttpError } from "./HttpError.js";
export const errorHandler = (errorStream) => (err, req, res, next) => {
    let status = 500;
    let message = 'Unknown server error! ' + err.message;
    if (err instanceof HttpError) {
        status = err.status;
        message = err.message;
    }
    let errLog = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${status} - ${err.message}\n`;
    errorStream.write(errLog);
    res.status(status).send(message);
};
