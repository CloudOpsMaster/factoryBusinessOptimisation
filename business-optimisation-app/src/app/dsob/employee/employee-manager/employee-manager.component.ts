import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/HR/Employee';
import { EmployeeViewMode } from '../employee-view-mode.enum';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  get addDisabled(): boolean {
    return this.editingInProcess;
  }

  get editDisabled(): boolean {
    return this.currentEmployeeId < 0 || this.editingInProcess;
  }

  get deleteDisabled(): boolean {
    return this.currentEmployeeId < 0 || this.editingInProcess;
  }

  currentEmployeeId = -1;
  employees = new Array<Employee>();
  viewMode = EmployeeViewMode.View;
  editingInProcess = false;
  hideSelection = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.employees;
    if (this.employees && this.employees.length > 0) {
      this.currentEmployeeId = this.employees[0].id;
    }
  }

  onCurrentEmpChanged(id: number) {
    this.currentEmployeeId = id;
  }

  onAddClick(event: MouseEvent) {
    this.editingInProcess = true;
    this.hideSelection = true;
    this.viewMode = EmployeeViewMode.Add;
  }

  onEditClick(event: MouseEvent) {
    this.editingInProcess = true;
    this.viewMode = EmployeeViewMode.Edit;
  }

  onDeleteClick(event: MouseEvent) {
    this.editingInProcess = true;
    this.viewMode = EmployeeViewMode.Delete;
  }

  onCanceled() {
    this.stopEditing();
  }

  onSaved(id: number) {
    this.stopEditing();
    this.employees = this.employeeService.employees;
    this.onCurrentEmpChanged(id);
  }

  private stopEditing() {
    this.editingInProcess = false;
    this.hideSelection = false;
    this.viewMode = EmployeeViewMode.View;
  }

}
