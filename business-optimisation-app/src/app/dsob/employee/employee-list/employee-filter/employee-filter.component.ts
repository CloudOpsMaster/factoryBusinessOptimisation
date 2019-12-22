import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeFilter } from './employee-filter';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent {

  @Output() applyFilter = new EventEmitter<EmployeeFilter>();

  visible = false;
  filter = new EmployeeFilter();

  constructor() { }

  onApplyClick() {
    this.applyFilter.emit(this.filter);
  }

  onResetClick() {
    this.filter = new EmployeeFilter();
    this.onApplyClick();
  }

  onFilterClick() {
    this.visible = !this.visible;
  }

}
