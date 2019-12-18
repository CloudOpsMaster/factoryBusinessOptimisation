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
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;
  @Output() currentEmpChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.focusFirstItem();
  }

  ngOnChanges() {

  }

  isSelected(employee: Employee): boolean {
    return !this.hideSelection && this.focusEntityId === employee.id;
  }

  onRowClick(employee: Employee) {
    if (this.locked || !employee) {
      return;
    }
    this.focusEntityId = employee.id;
    this.currentEmpChanged.emit(this.focusEntityId);
  }

  private focusFirstItem() {
    if (this.employees && this.employees.length > 0) {
      this.onRowClick(this.employees.find(e => e.id === this.focusEntityId));
    }
  }

}
