import { convertEmployeeDtoToEmployee } from "../utils/tools.js";
import { accountServiceMongo } from "../services/accountingService/AccountServiceMongoImpl.js";
import { HttpError } from "../errorHandler/HttpError.js";
const service = accountServiceMongo;
export const getAllEmployeesWithPagination = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(page) || Number.isNaN(limit))
        throw new HttpError(400, "Wrong pagination params");
    const result = await service.getAllEmployeesWithPagination(page, limit);
    res.json({ data: result, page, limit });
};
export const setRole = async (req, res, next) => {
    const role = req.body.role;
    const id = req.query.id;
    const result = await service.setRole(id, role);
    res.json(result);
};
export const getEmployeeById = async (req, res, next) => {
    const query_id = req.query.id;
    const result = await service.getEmployeeById(query_id);
    res.json(result);
};
export const getAllEmployees = async (req, res, next) => {
    const result = await service.getAllEmployees();
    res.json(result);
};
export const updatePassword = async (req, res, next) => {
    const { id, newPassword } = req.body;
    await service.changePassword(id, newPassword);
    res.status(200).send("");
};
export const updateEmployee = async (req, res, next) => {
    const body = req.body;
    const query_id = req.query.id;
    const result = await service.updateEmployee(query_id, body);
    res.json(result);
};
export const fireEmployee = async (req, res, next) => {
    const query_id = req.query.id;
    const result = await service.fireEmployee(query_id);
    res.json(result);
};
export const hireEmployee = async (req, res, next) => {
    const body = req.body;
    const emp = convertEmployeeDtoToEmployee(body);
    const result = await service.hireEmployee(emp);
    res.status(201).json(result);
};
