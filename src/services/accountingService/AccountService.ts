import {Employee, EmployeeDto, SavedFiredEmployee, UpdateEmployeeDto} from "../../model/Employee.js";

export interface AccountService {
    hireEmployee: (employee: Employee) => Promise<Employee>;
    fireEmployee: (empId:string) => Promise<SavedFiredEmployee>;
    updateEmployee: (empId:string , employee: UpdateEmployeeDto) => Promise<Employee>;
    changePassword:  (empId:string , newPassword: string) => Promise<void>;
    getEmployeeById: (id: string) => Promise<Employee>;
    getAllEmployees: () => Promise<SavedFiredEmployee[]>;
    setRole: (id:string, newRole:string) => Promise<Employee>;
}
