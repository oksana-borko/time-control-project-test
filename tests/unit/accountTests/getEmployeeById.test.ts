import {accountServiceMongo} from "../../../src/services/accountingService/AccountServiceMongoImpl.ts";
import {EmployeeModel} from "../../../src/model/EmployeeMongoModels.ts";


jest.mock("../../../src/model/EmployeeMongoModels.ts");

describe('AccountServiceMongoImpl.getEmployeeById', () => {
    const service = accountServiceMongo;

    test('Failed test: employee not found', async () => {

        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.getEmployeeById("UNKNOWN")).rejects.toThrow(`Employee with id UNKNOWN not found`);
    })
    test('Passed test:', async () => {
        const mockEmployee = {
            _id: "123",
            firstName: "MockEmp",
            hash: "23498",
            lastName: "MOCK",
            roles: 'crew',
            table_num: "tab_num"
        };
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockEmployee)
        });
        await expect(service.getEmployeeById('123')).resolves.toEqual(mockEmployee);
        expect(EmployeeModel.findById).toHaveBeenCalledWith('123');
    })
})