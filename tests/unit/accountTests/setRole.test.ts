import {accountServiceMongo} from "../../../src/services/accountingService/AccountServiceMongoImpl.ts";
import {AccountService} from "../../../src/services/accountingService/AccountService.ts";
import {EmployeeModel} from "../../../src/model/EmployeeMongoModels.ts";
import {checkRole} from "../../../src/utils/tools.ts";
jest.mock("../../../src/utils/tools.ts");
jest.mock("../../../src/model/EmployeeMongoModels.ts");

describe('AccountServiceMongoImpl.setRole', () => {
    const service: AccountService = accountServiceMongo;

    const emp = {
        id: "123",
        name: "mockEmployee",
        roles: "newRole",
        hash: "hash123"
    };
    test('Failed test: employee not found', () => {
        service.getEmployeeById = jest.fn().mockRejectedValue(new Error("Error"));
        expect(service.setRole("UNKNOWN", "newRole")).rejects.toThrow("Error")
    })

    test('Failed test: role not added', () => {
        service.getEmployeeById = jest.fn().mockResolvedValue(emp);
        (checkRole as jest.Mock).mockReturnValue("newRole");
        (EmployeeModel.findOneAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });

        expect(service.setRole("UNKNOWN", "newRole")).rejects.toThrow("Employee updating failed!")
    });
    test('Passed test', async () => {
        service.getEmployeeById = jest.fn().mockResolvedValue(emp);
        (checkRole as jest.Mock).mockReturnValue("newRole");
        (EmployeeModel.findOneAndUpdate as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(emp)
        });

        await expect(service.setRole("123", "newRole")).resolves.toEqual(emp);
        expect(checkRole).toHaveBeenCalledWith("newRole");
        expect(service.getEmployeeById).toHaveBeenCalledWith('123');
        expect(EmployeeModel.findOneAndUpdate).toHaveBeenCalledWith({id: "123"}, {
            $set: {roles: "newRole"}
        }, {new: true})
    });
})