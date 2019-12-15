import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees = new Array<Employee>();

  get editDisabled(): boolean {
    return this.currentEmployee === undefined;
  }

  get deleteDisabled(): boolean {
    return this.currentEmployee === undefined;
  }

  private currentEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.employees;
  }

  onRowClick(employee: Employee) {
    this.currentEmployee = employee;
  }

  isSelected(employee: Employee): boolean {
    return this.currentEmployee && this.currentEmployee.id === employee.id;
  }

}
