import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Employee } from 'src/app/models/HR/Employee';
import { EmployeeInfo } from '../EmployeeInfo';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {
  @Input() employees: Array<EmployeeInfo>;
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

  isSelected(employee: EmployeeInfo): boolean {
    return !this.hideSelection && this.focusEntityId === employee.mainInfo.id;
  }

  onRowClick(employee: EmployeeInfo) {
    if (this.locked || !employee) {
      return;
    }
    this.focusEntityId = employee.mainInfo.id;
    this.currentEmpChanged.emit(this.focusEntityId);
  }

  private focusFirstItem() {
    if (this.employees && this.employees.length > 0) {
      this.onRowClick(this.employees.find(e => e.mainInfo.id === this.focusEntityId));
    }
  }

}
