import {NextFunction, Request, Response} from "express";
import {timeControlServiceImpl} from "../services/timeControlService/TimeControlServiceMongoImpl.js";
import {HttpError} from "../errorHandler/HttpError.js";
import {accountServiceMongo} from "../services/accountingService/AccountServiceMongoImpl.js";
import {logger} from "../Logger/winston.js";

const service = timeControlServiceImpl;

export const getCurrentShiftStaff = async (req: Request, res: Response, next: NextFunction) => {
    const result = await service.getCurrentShiftStaff();
    res.json(result);
};
export const correctShift = (req:Request, res:Response, next:NextFunction) => {
    res.send("Success")
};
export const setBreak = async (req: Request, res: Response, next: NextFunction) => {
    const tabNum = req.query.tabNum as string;
    const duration = parseInt(req.query.duration as string);
    if (duration !== 15 && duration !== 30) throw new HttpError(400, "Wrong break duration");
    await service.setBreak(tabNum, duration);
    res.send("Ok")
};
export const finishShift = async (req: Request, res: Response, next: NextFunction) => {
    const tabNum = req.query.tabNum as string;
    const result = await service.finishShift(tabNum)
    res.status(201).json(result);
};
export const startShift = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(new Date().toISOString()+ `=> Request for starting shift`)
    const tabNum = req.query.tabNum as string;
    logger.debug(`Tab num: ${tabNum}`)
   const emp = await accountServiceMongo.getEmployeeByTabNum(tabNum);

    const result = await service.startShift(tabNum);
    res.json(result);
};

