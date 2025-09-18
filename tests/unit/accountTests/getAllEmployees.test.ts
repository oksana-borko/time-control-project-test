import {EmployeeModel} from "../../../src/model/EmployeeMongoModels.ts";
import {accountServiceMongo} from "../../../src/services/accountingService/AccountServiceMongoImpl.ts";
import {AccountService} from "../../../src/services/accountingService/AccountService.ts";
jest.mock("../../../src/model/EmployeeMongoModels.ts");

describe('AccountServiceMongoImpl.getAllEmployees', () => {
    const service: AccountService = accountServiceMongo;
    const mockEmployee = {
        firstName: "Mock",
        lastName: "Employee",
        _id: "123",
        table_num:"table_num",
    }
    test('Positive test', () => {
        (EmployeeModel.find as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue([mockEmployee])
        })
        expect(service.getAllEmployees()).resolves.toEqual([mockEmployee]);
        expect(EmployeeModel.find).toHaveBeenCalledWith({});
    })
})