import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Employee } from 'src/app/models/HR/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /** list of employees from storage */
  employees: Array<Employee>;

  private employeesStorageKey = 'employeesStorageKey';

  updateEmployee(employee: Employee) {
    if (employee.id < 0) {
      employee.id = this.getCorrectEmployeeId();
      this.employees.push(employee);
    } else {
      this.employees.push(employee);
    }
    this.storageService.setData(this.employeesStorageKey, this.employees);
    this.employees = this.storageService.getData(this.employeesStorageKey);
    // TODO: notify about data changed
  }

  constructor(private storageService: StorageService) {
    // this.employees = this.storageService.getData(this.employeesStorageKey);
    this.employees = this.getFakeEmployees();
  }

  private getCorrectEmployeeId(): number {
    let id = 0;
    if (this.employees.length > 0) {
      id = this.employees[this.employees.length - 1].id + 1;
    }
    return id;
  }

  private getFakeEmployees(): Employee[] {
    const employees = new Array<Employee>();
    const emp = new Employee();
    emp.id = 0;
    emp.firstName = 'f';
    emp.secondName = 's';
    emp.patronymic = 'p';

    const emp1 = new Employee();
    emp.id = 1;
    emp1.firstName = 'f1';
    emp1.secondName = 's1';
    emp1.patronymic = 'p1';

    employees.push(emp);
    employees.push(emp1);

    return employees;
  }

}
