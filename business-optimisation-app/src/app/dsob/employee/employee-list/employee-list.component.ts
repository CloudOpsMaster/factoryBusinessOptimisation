import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {
  @Input() employees: Array<Employee>;
  @Input() locked = false;
  @Output() currentEmpChanged = new EventEmitter<number>();

  private currentEmployee: Employee;

  constructor() { }

  ngOnInit() {
    this.focusFirstItem();
  }

  ngOnChanges() {

  }

  isSelected(employee: Employee): boolean {
    return this.currentEmployee && this.currentEmployee.id === employee.id;
  }

  onRowClick(employee: Employee) {
    if (this.locked) {
      return;
    }
    this.currentEmployee = employee;
    this.currentEmpChanged.emit(this.currentEmployee.id);
  }

  private focusFirstItem() {
    if (this.employees && this.employees.length > 0) {
      this.onRowClick(this.employees[0]);
    }
  }

}
