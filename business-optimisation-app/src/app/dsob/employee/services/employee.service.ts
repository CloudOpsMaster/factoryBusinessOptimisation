import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';
import { StorageService } from 'src/app/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /** list of employees from storage */
  employees: Array<Employee>;

  private employeesStorageKey = 'EmployeesStorageKey';

  updateEmployee(employee: Employee) {
    if (employee.id < 0) {
      employee.id = this.getCorrectEmployeeId();
      this.employees.push(employee);
    } else {
      this.performUpdateEmployee(employee);
    }
    this.storageService.set(this.employeesStorageKey, this.employees);
    this.employees = this.storageService.get(this.employeesStorageKey);
  }

  deleteEmployee(employeeId: number) {
    const indexToDelete = this.employees.findIndex(e => e.id === employeeId);
    if (indexToDelete > -1) {
      this.employees.splice(indexToDelete, 1);
    }
    this.storageService.set(this.employeesStorageKey, this.employees);
    this.employees = this.storageService.get(this.employeesStorageKey);
  }

  constructor(private storageService: StorageService) {
    this.initializeStorage();
    this.employees = this.storageService.get(this.employeesStorageKey);
    if (!this.employees) {
      this.employees = new Array<Employee>();
    }
    // this.employees = this.getFakeEmployees();
  }

  private getCorrectEmployeeId(): number {
    let id = 0;
    if (this.employees.length > 0) {
      id = this.employees[this.employees.length - 1].id + 1;
    }
    return id;
  }

  private performUpdateEmployee(employee: Employee) {
    const employeeToUpdate = this.employees.find(e => e.id === employee.id);
    if (employeeToUpdate) {
      employeeToUpdate.firstName = employee.firstName;
      employeeToUpdate.secondName = employee.secondName;
      employeeToUpdate.patronymic = employee.patronymic;
    }
  }

  private initializeStorage() {
    if (!this.storageService.has(this.employeesStorageKey)) {
      this.storageService.set(this.employeesStorageKey, new Array<Employee>());
    }
  }

  private getFakeEmployees(): Employee[] {
    const employees = new Array<Employee>();
    const emp = new Employee();
    emp.id = 0;
    emp.firstName = 'f';
    emp.secondName = 's';
    emp.patronymic = 'p';

    const emp1 = new Employee();
    emp1.id = 1;
    emp1.firstName = 'f1';
    emp1.secondName = 's1';
    emp1.patronymic = 'p1';

    employees.push(emp);
    employees.push(emp1);

    return employees;
  }

}
