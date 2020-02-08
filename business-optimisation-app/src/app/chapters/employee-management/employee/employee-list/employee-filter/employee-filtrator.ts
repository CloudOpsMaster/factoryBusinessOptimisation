import { EmployeeInfo } from '../../../../../chapters/employee-management/employee/EmployeeInfo';
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
      if (filter.patronymic && filter.patronymic.length > 0) {
         filteredEmployees = filteredEmployees.filter(e => e.mainInfo.patronymic.startsWith(filter.patronymic));
      }
      if (filter.id && filter.id.length > 0) {
         filteredEmployees = filteredEmployees.filter(e => e.mainInfo.id.toString().startsWith(filter.id));
      }
      if (filter.taxNumber && filter.taxNumber.length > 0) {
         filteredEmployees = filteredEmployees.filter(e => e.document.taxNumber.toString().startsWith(filter.taxNumber));
      }
      if (filter.position && filter.position.id > -1) {
         filteredEmployees = filteredEmployees.filter(e => e.position.id === +filter.position.id);
      }

      return filteredEmployees;
   }
}
