import express from "express";
import {bodyValidation} from "../validation/bodyValidation.js";
import {
    ChangePassDtoSchema,
    ChangeRolesSchema,
    EmployeeDtoSchema,
    UpdateEmployeeDtoSchema
} from "../validation/joiSchemas.js";
import * as controller from '../controllers/accountController.js';
export const accountRouter = express.Router();

accountRouter.post('/', bodyValidation(EmployeeDtoSchema), controller.hireEmployee);
accountRouter.delete('/', controller.fireEmployee);
accountRouter.patch('/', bodyValidation(UpdateEmployeeDtoSchema), controller.updateEmployee);
accountRouter.patch('/password', bodyValidation(ChangePassDtoSchema),controller.updatePassword);
accountRouter.get('/', controller.getAllEmployees);
accountRouter.get('/pages', controller.getAllEmployeesWithPagination);
accountRouter.get('/employee', controller.getEmployeeById);
accountRouter.patch('/set_role', bodyValidation(ChangeRolesSchema), controller.setRole);