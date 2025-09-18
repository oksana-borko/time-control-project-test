import {CrewShiftType, TabNumTimeType} from "../../model/Shift.js";


export interface TimeControlService {
    startShift: (tabNum: string) => Promise<TabNumTimeType>
    finishShift: (tabNum: string) => Promise<TabNumTimeType>
    setBreak: (tabNum: string, breakDur:number) => Promise<void>
    correctShift: (tabNumCrew: string, tabNumMng:string, start:string, finish:string, date:string) => Promise<void>

    getCurrentShiftStaff: () => Promise<CrewShiftType[]>
}