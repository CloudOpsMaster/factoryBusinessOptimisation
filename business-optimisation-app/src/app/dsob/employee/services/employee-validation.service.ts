import { Injectable } from '@angular/core';
import { EmployeeInfo, EmployeeMainInfo } from '../EmployeeInfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeValidationService {

  // TODO: provide move info about error
  validate(employee: EmployeeInfo): string {
    let response = '';
    if (employee) {
      response = this.validateMainInfo(employee.mainInfo);
    }
    return response;
  }

  constructor() { }

  private validateMainInfo(mainInfo: EmployeeMainInfo): string {
    let response = '';
    if (mainInfo) {
      if (this.stringIsNullOrEmpty(mainInfo.firstName)) {
        response = 'Имя не может быть пустым';
      } else if (this.stringIsNullOrEmpty(mainInfo.secondName)) {
        response = 'Фамилия не может быть пустой';
      } else if (this.stringIsNullOrEmpty(mainInfo.patronymic)) {
        response = 'Отчество не может быть пустым';
      }
    }
    return response;
  }

  private stringIsNullOrEmpty(value: string): boolean {
    return !value || value.length === 0;
  }

}
