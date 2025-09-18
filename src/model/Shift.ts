
export type TabNumTimeType = {
    tabNum:string,
    time:string
}

export type CrewShiftType = {
    _id: number,
    startShift: number, //timestamp shift start time
    finishShift: number|null , //timestamp shift finish time
    table_num: string,
    shiftDuration: number,
    breaks: number, // решили, что это просто накопление перерывов, длительность которых фиксирована и может быть  = 15 или 30
    сorrect: string|null, //mng table_num
    monthHours: number // накопление рабочего времени с начала месяца
}