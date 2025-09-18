import {Roles} from "../utils/Roles.js";

export type EmployeeDto = {
    firstName: string,
    lastName: string,
    password: string,
    id: string,
}
export type Employee = {
    firstName: string,
    lastName: string,
    _id: string,
    table_num: string,
    // hour_salary?:number,
    hash: string,
    roles: Roles
}

export type SavedFiredEmployee = {
    firstName: string,
    lastName: string,
    _id: string,
    table_num:string,
    fireDate?:string,
}

export type UpdateEmployeeDto = {
    firstName: string,
    lastName: string,
}