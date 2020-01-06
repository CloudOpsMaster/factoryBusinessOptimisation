import { Injectable } from '@angular/core';
import { StorageService, StorageKey } from '../services/storage.service';
import { Employee } from '../models/HR/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInfoService {
  private static storage = new StorageService();
  private static employees = new Array<Employee>();

  public static getEmployee(): Array<Employee> {
    const info = this.storage.getData(StorageKey.EmployeesStorageKey);
    info.forEach((employee:Employee) => {
      this.employees.push(employee);
    });
    return this.employees;
  }
}
