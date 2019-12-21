import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeFilter } from './employee-filter';


@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {

  @Input() filter: EmployeeFilter;
  @Output() applyFilter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onApplyClick() {
    this.applyFilter.emit();
  }

}
