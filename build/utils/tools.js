import bcrypt from 'bcrypt';
import { Roles } from "./Roles.js";
import { v4 as uuidv4 } from 'uuid';
import { HttpError } from "../errorHandler/HttpError.js";
import { FiredEmployeeModel } from "../model/EmployeeMongoModels.js";
function generateTabNumber() {
    return uuidv4();
}
export const convertEmployeeDtoToEmployee = (dto) => {
    const employee = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        _id: dto.id,
        hash: bcrypt.hashSync(dto.password, 10),
        table_num: generateTabNumber(),
        roles: Roles.CREW
    };
    return employee;
};
export const checkFiredEmployees = async (id) => {
    if (await FiredEmployeeModel.findOne({ id }))
        throw new HttpError(409, "This employee was fired");
};
export const convertEmployeeToFiredEmployee = (emp) => {
    const fired = {
        fireDate: new Date().toDateString(),
        firstName: emp.firstName,
        lastName: emp.lastName,
        _id: emp._id,
        table_num: emp.table_num
    };
    return fired;
};
export const checkRole = (role) => {
    const newRole = Object.values(Roles).find(r => r === role);
    if (!newRole)
        throw new HttpError(400, "Wrong role!");
    return newRole;
};
export const getMonthHours = (shifts) => {
    return shifts.map(item => item.shiftDuration).reduce((acc, item) => acc + item, 0);
};
export const generateShiftId = () => Math.trunc(Math.random() * 10000) + 1;
