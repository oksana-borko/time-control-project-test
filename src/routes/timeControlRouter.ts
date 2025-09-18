import express from "express";
import * as controller from '../controllers/timeController.js'
export const timeControlRouter = express.Router();


timeControlRouter.post('/start', controller.startShift);
timeControlRouter.patch('/finish', controller.finishShift);
timeControlRouter.patch('/break', controller.setBreak);
timeControlRouter.patch('/correct', controller.correctShift);
timeControlRouter.get('/', controller.getCurrentShiftStaff);