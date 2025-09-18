

import {accountServiceMongo} from "../../../src/services/accountingService/AccountServiceMongoImpl.ts";
import {EmployeeModel, FiredEmployeeModel} from "../../../src/model/EmployeeMongoModels.ts";
import {convertEmployeeToFiredEmployee} from "../../../src/utils/tools.ts";
import {Employee} from "../../../src/model/Employee.ts";
jest.mock("../../../src/model/EmployeeMongoModels.ts");
jest.mock("../../../src/utils/tools.ts");
describe("AccountServiceMongoImpl.fireEmployee", () => {
    const service = accountServiceMongo;

    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "23498",
        lastName: "MOCK",
        roles: 'crew',
        table_num: "tab_num"
    };

    const mockFiredEmployee = {
        firstName: "MockEmp",
        lastName: "MOCK",
        _id: "123",
        table_num:"tab_num",
        fireDate :"now",
    }
    test("Test failed: employee not exists", () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
        expect(service.fireEmployee('1235')).rejects.toThrow(`Employee with id 1235 not found`)
        expect(EmployeeModel.findByIdAndDelete).not.toHaveBeenCalledWith('123')
    });

    test("Test passed", async () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockEmployee);
        (convertEmployeeToFiredEmployee as jest.Mock).mockReturnValue(mockFiredEmployee);
        (FiredEmployeeModel as unknown as jest.Mock)
            .mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockFiredEmployee)
            }));
        await expect(service.fireEmployee('123')).resolves.toEqual(mockFiredEmployee);
        expect(EmployeeModel.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(convertEmployeeToFiredEmployee).toHaveBeenCalledWith(mockEmployee as Employee);
        expect(FiredEmployeeModel).toHaveBeenCalledWith(mockFiredEmployee);

    });

})