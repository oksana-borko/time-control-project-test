import { timeControlServiceImpl } from "../services/timeControlService/TimeControlServiceMongoImpl.js";
import { HttpError } from "../errorHandler/HttpError.js";
import { accountServiceMongo } from "../services/accountingService/AccountServiceMongoImpl.js";
import { logger } from "../Logger/winston.js";
const service = timeControlServiceImpl;
export const getCurrentShiftStaff = async (req, res, next) => {
    const result = await service.getCurrentShiftStaff();
    res.json(result);
};
export const correctShift = (req, res, next) => {
    res.send("Success");
};
export const setBreak = async (req, res, next) => {
    const tabNum = req.query.tabNum;
    const duration = parseInt(req.query.duration);
    if (duration !== 15 && duration !== 30)
        throw new HttpError(400, "Wrong break duration");
    await service.setBreak(tabNum, duration);
    res.send("Ok");
};
export const finishShift = async (req, res, next) => {
    const tabNum = req.query.tabNum;
    const result = await service.finishShift(tabNum);
    res.status(201).json(result);
};
export const startShift = async (req, res, next) => {
    logger.debug(new Date().toISOString() + `=> Request for starting shift`);
    const tabNum = req.query.tabNum;
    logger.debug(`Tab num: ${tabNum}`);
    const emp = await accountServiceMongo.getEmployeeByTabNum(tabNum);
    const result = await service.startShift(tabNum);
    res.json(result);
};
