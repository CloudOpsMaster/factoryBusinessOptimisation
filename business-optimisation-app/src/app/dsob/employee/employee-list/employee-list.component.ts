import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { EmployeeInfo } from '../EmployeeInfo';
import { EmployeeFilter } from './employee-filter/employee-filter';
import { EmployeeFiltrator } from './employee-filter/employee-filtrator';

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

  filter = new EmployeeFilter();
  filteredEmployees: Array<EmployeeInfo>;

  constructor() { }

  ngOnInit() {
    this.onApplyFilter();
    this.focusFirstItem();
  }

  ngOnChanges() {
    this.onApplyFilter();
    this.focusFirstItem();
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

  onApplyFilter() {
    this.filteredEmployees = EmployeeFiltrator.GetFilteredEmployees(this.employees, this.filter);
    this.focusFirstItem();
  }

  private focusFirstItem() {
    if (this.filteredEmployees && this.filteredEmployees.length > 0) {
      const employeeToFocus = this.filteredEmployees.find(e => e.mainInfo.id === this.focusEntityId);
      if (employeeToFocus) {
        this.onRowClick(employeeToFocus);
      } else {
        this.onRowClick(this.filteredEmployees[0]);
      }
    }
  }

}
