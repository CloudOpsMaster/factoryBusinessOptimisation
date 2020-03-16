import { Injectable } from '@angular/core';
import { EmployeeInfo, EmployeeMainInfo } from '../EmployeeInfo';

@Injectable({
   providedIn: 'root'
})
export class EmployeeValidationService {

   // TODO: provide more info about error
   validate(employee: EmployeeInfo): string {
      if (!employee) {
         return '';
      }
      let response = '';
      // TODO: provide more validation rules
      response = this.validateMainInfo(employee.mainInfo);
      if (response.length === 0) {
         response = this.validateEmployment(employee);
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

   private validateEmployment(employee: EmployeeInfo): string {
      let response = '';
      if (employee.position.title === '' && !employee.employment.dismissalDate) {
         response = 'Работник должен занимать должность';
      } else if (!employee.employment.employmentDate && !employee.employment.dismissalDate) {
         response = 'Работник должден иметь дату приема на работу или увольнения';
      }
      return response;
   }

   private stringIsNullOrEmpty(value: string): boolean {
      return !value || value.length === 0;
   }

}
