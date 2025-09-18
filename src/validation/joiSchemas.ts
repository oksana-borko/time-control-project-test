import Joi, {string} from 'joi'
import {Roles} from "../utils/Roles.js";


export const EmployeeDtoSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    password: Joi.string().alphanum().min(8).required(),
    id: Joi.string().length(9).required(),
});
export const ChangePassDtoSchema = Joi.object({
    id:Joi.string().length(9).required(),
    newPassword: Joi.string().alphanum().min(8).required(),
});

export const UpdateEmployeeDtoSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
});

export const ChangeRolesSchema = Joi.object({
    role: Joi.string().valid(...Object.values(Roles)).required()
})

export type ArraySchema = typeof ChangeRolesSchema;