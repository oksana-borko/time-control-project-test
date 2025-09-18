import {AccountService} from "../../../src/services/accountingService/AccountService.ts";
import {accountServiceMongo} from "../../../src/services/accountingService/AccountServiceMongoImpl.ts";
import {EmployeeModel} from "../../../src/model/EmployeeMongoModels.ts";
import bcrypt from "bcrypt";
jest.mock("../../../src/model/EmployeeMongoModels.ts");
jest.mock('bcrypt');

describe('AccountServiceMongoImpl.changePassword', () => {
    const service: AccountService = accountServiceMongo;

    test('Test failed: employee not found', () => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
        expect(service.changePassword('UNKNOWN','newPass')).rejects.toThrow('Employee with id UNKNOWN not found')
    })

    test('Test passed',() => {
        (EmployeeModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({_id: "123", hashPass:"newHashedPass"});
        bcrypt.hashSync = jest.fn().mockReturnValue("newHashedPass");

        expect(service.changePassword("123", "newPass")).resolves.toBeUndefined();
        expect(EmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith("123",
            {$set:{hash:"newHashedPass"}},
            {new: true});
        expect(bcrypt.hashSync).toHaveBeenCalledWith("newPass",10)
    })
})