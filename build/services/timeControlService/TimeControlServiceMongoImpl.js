import { ShiftModel } from "../../model/ShiftMongoModels.js";
import { HttpError } from "../../errorHandler/HttpError.js";
import { generateShiftId, getMonthHours } from "../../utils/tools.js";
import { logger } from "../../Logger/winston.js";
export class TimeControlServiceMongoImpl {
    async startShift(tabNum) {
        logger.info("service start to process request");
        let monthHours = 0;
        const currentTime = new Date().getTime();
        const shifts = await ShiftModel.find({ table_num: tabNum }).exec();
        if (shifts.length !== 0) {
            const lastShift = shifts[shifts.length - 1];
            if (lastShift.finishShift == null) {
                logger.error(`${new Date().toISOString()} => Previous shift not closed, 409 Conflict`);
                throw new HttpError(409, "Previous shift not closed");
            }
            // if(currentTime - lastShift.finishShift < (configuration.minTimeBetweenShifts * 1000 * 3600))
            //     throw new HttpError(409, "Shifts too close");
            monthHours = getMonthHours(shifts);
        }
        const newShift = {
            breaks: 0,
            finishShift: null,
            monthHours,
            shiftDuration: 0,
            _id: generateShiftId(),
            startShift: currentTime,
            table_num: tabNum,
            сorrect: null
        };
        const newShiftDoc = new ShiftModel(newShift);
        await newShiftDoc.save();
        logger.info(`Shift for tab num ${tabNum} starts`);
        return { tabNum, time: new Date(currentTime).toTimeString() };
    }
    async finishShift(tabNum) {
        const currentTime = new Date().getTime();
        const shift = await ShiftModel.findOneAndUpdate({ table_num: tabNum, finishShift: null }, [{ $set: { finishShift: currentTime,
                    shiftDuration: { $subtract: [currentTime, '$startShift'] } } }
        ], { new: true }).exec();
        console.log(shift);
        if (!shift)
            throw new HttpError(409, "Opened shift not found");
        return { tabNum, time: new Date(currentTime).toTimeString() };
    }
    getCurrentShiftStaff() {
        return Promise.resolve([]);
    }
    correctShift(tabNumCrew, tabNumMng, start, finish, date) {
        return Promise.resolve(undefined);
    }
    setBreak(tabNum, breakDur) {
        return Promise.resolve(undefined);
    }
}
export const timeControlServiceImpl = new TimeControlServiceMongoImpl();
