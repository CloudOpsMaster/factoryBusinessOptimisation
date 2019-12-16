import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  get editDisabled(): boolean {
    return this.currentEmployeeId < 0;
  }

  get deleteDisabled(): boolean {
    return this.currentEmployeeId < 0;
  }

  currentEmployeeId = -1;
  employees = new Array<Employee>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.employees;
  }

  onCurrentEmpChanged(id: number) {
    this.currentEmployeeId = id;
  }

  onAddClick(event: MouseEvent) {
    //this.addNewRequested.emit();
  }

  onEditClick(event: MouseEvent) {
    //this.editRequested.emit(this.currentEmployeeId);
  }

  onDeleteClick(event: MouseEvent) {
    //this.deleteRequested.emit(this.currentEmployeeId);
  }

}
