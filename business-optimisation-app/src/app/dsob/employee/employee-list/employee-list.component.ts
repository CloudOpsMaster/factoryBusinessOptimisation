import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EmployeeInfo } from '../EmployeeInfo';
import { EmployeeFilter } from './employee-filter/employee-filter';
import { EmployeeFiltrator } from './employee-filter/employee-filtrator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
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
  }

  private focusFirstItem() {
    if (this.employees && this.employees.length > 0) {
      this.onRowClick(this.employees.find(e => e.mainInfo.id === this.focusEntityId));
    }
  }

}
