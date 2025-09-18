import {Request, Response,NextFunction} from "express";
import {HttpError} from "./HttpError.js";
import {WriteStream} from "node:fs";

export const errorHandler = (errorStream: WriteStream) =>
    (err:Error, req:Request, res:Response, next:NextFunction) => {
    let status = 500;
    let message = 'Unknown server error! ' + err.message;
        if(err instanceof HttpError){
            status = err.status;
            message = err.message
        }
    let errLog = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${status} - ${err.message}\n`;
        errorStream.write(errLog);
        res.status(status).send(message)
    }