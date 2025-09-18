import { EmployeeModel, FiredEmployeeModel } from "../../model/EmployeeMongoModels.js";
import { HttpError } from "../../errorHandler/HttpError.js";
import { checkFiredEmployees, checkRole, convertEmployeeToFiredEmployee } from "../../utils/tools.js";
import bcrypt from "bcrypt";
class AccountServiceMongoImpl {
    async changePassword(empId, newPassword) {
        const updated = await EmployeeModel.findByIdAndUpdate(empId, { $set: { hash: bcrypt.hashSync(newPassword, 10) } }, { new: true });
        if (!updated)
            throw new HttpError(404, `Employee with id ${empId} not found`);
    }
    async fireEmployee(empId) {
        const temp = await EmployeeModel.findByIdAndDelete(empId);
        if (!temp)
            throw new HttpError(404, `Employee with id ${empId} not found`);
        const fired = convertEmployeeToFiredEmployee(temp);
        const firedDoc = new FiredEmployeeModel(fired);
        await firedDoc.save();
        return fired;
    }
    async getAllEmployees() {
        const result = await EmployeeModel.find({}).exec();
        return result;
    }
    async getEmployeeById(id) {
        const employee = await EmployeeModel.findById(id).exec();
        if (!employee)
            throw new HttpError(404, `Employee with id ${id} not found`);
        return employee;
    }
    async hireEmployee(employee) {
        const temp = await EmployeeModel.findById(employee._id).exec();
        if (temp)
            throw new HttpError(409, `Employee with id ${employee._id} already exists`);
        await checkFiredEmployees(employee._id);
        const empDoc = new EmployeeModel(employee);
        await empDoc.save();
        return employee;
    }
    async setRole(id, newRole) {
        const emp = await this.getEmployeeById(id);
        const role = checkRole(newRole);
        const updated = await EmployeeModel.findOneAndUpdate({ id }, {
            $set: { roles: newRole }
        }, { new: true }).exec();
        if (!updated)
            throw new HttpError(404, "Employee updating failed!");
        return updated;
    }
    async updateEmployee(empId, employee) {
        const updated = await EmployeeModel.findByIdAndUpdate(empId, {
            $set: { firstName: employee.firstName, lastName: employee.lastName }
        }, { new: true }).exec();
        if (!updated)
            throw new HttpError(404, "Employee updating failed!");
        return updated;
    }
    async getAllEmployeesWithPagination(page, limit) {
        const skip = (page - 1) * limit;
        const [employees, total] = await Promise.all([
            EmployeeModel.find().skip(skip).limit(limit),
            EmployeeModel.countDocuments()
        ]);
        return employees;
    }
    async getEmployeeByTabNum(tabNum) {
        const emp = await EmployeeModel.findOne({ table_num: tabNum });
        if (!emp)
            throw new HttpError(404, `Employee with table number: ${tabNum} not found`);
        return emp;
    }
}
export const accountServiceMongo = new AccountServiceMongoImpl();
