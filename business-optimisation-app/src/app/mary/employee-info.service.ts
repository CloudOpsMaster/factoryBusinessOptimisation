import { Injectable } from '@angular/core';
import { StorageService, StorageKey } from '../services/storage.service';
import { Employee } from '../models/HR/Employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeInfoService {
  private static storage = new StorageService();

  public static getEmployee(): Array<Employee> {
    const info: Employee[] = this.storage.getData(StorageKey.EmployeesStorageKey);
    return info;
  }
}
