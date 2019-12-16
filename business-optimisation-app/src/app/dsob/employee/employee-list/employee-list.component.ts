import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Array<Employee>;
  @Output() currentEmpChanged = new EventEmitter<number>();
  @Output() addNewRequested = new EventEmitter();
  @Output() deleteRequested = new EventEmitter<number>();
  @Output() editRequested = new EventEmitter<number>();

  get editDisabled(): boolean {
    return this.currentEmployee === undefined;
  }

  get deleteDisabled(): boolean {
    return this.currentEmployee === undefined;
  }

  private currentEmployee: Employee;

  constructor() { }

  ngOnInit() {
  }

  isSelected(employee: Employee): boolean {
    return this.currentEmployee && this.currentEmployee.id === employee.id;
  }

  onRowClick(employee: Employee) {
    this.currentEmployee = employee;
    this.currentEmpChanged.emit(this.currentEmployee.id);
  }

  onAddClick(event: MouseEvent) {
    this.addNewRequested.emit();
  }

  onEditClick(event: MouseEvent) {
    this.editRequested.emit(this.currentEmployee.id);
  }

  onDeleteClick(event: MouseEvent) {
    this.deleteRequested.emit(this.currentEmployee.id);
  }

}
