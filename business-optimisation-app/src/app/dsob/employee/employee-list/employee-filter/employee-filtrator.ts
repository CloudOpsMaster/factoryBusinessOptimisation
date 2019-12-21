import { EmployeeInfo } from '../../EmployeeInfo';
import { EmployeeFilter } from './employee-filter';

export class EmployeeFiltrator {
    public static GetFilteredEmployees(employees: EmployeeInfo[], filter: EmployeeFilter): EmployeeInfo[] {
        let filteredEmployees = employees.filter(e => e);
        if (!filter) {
            return filteredEmployees;
        }
        if (filter.firstName && filter.firstName.length > 0) {
            filteredEmployees = employees.filter(e => e.mainInfo.firstName.startsWith(filter.firstName));
        }
        if (filter.secondName && filter.secondName.length > 0) {
            filteredEmployees = filteredEmployees.filter(e => e.mainInfo.secondName.startsWith(filter.secondName));
        }
        if (filter.patronymic && filter.patronymic.length > 0) {
            filteredEmployees = filteredEmployees.filter(e => e.mainInfo.patronymic.startsWith(filter.patronymic));
        }

        return filteredEmployees;
    }
}
