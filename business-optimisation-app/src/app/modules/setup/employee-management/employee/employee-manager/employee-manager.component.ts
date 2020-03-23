import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/hr/employee';
import { EmployeeViewMode } from '../employee-view-mode.enum';
import { EmployeeInfo } from '../EmployeeInfo';
import { TranslationService } from 'angular-l10n';

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

  get isGridVisible(): boolean {
    return this.viewMode === EmployeeViewMode.View;
  }

  get isDetailsVisible(): boolean {
    return this.viewMode !== EmployeeViewMode.View;
  }

  currentEmployeeId = -1;
  employees = new Array<EmployeeInfo>();
  viewMode = EmployeeViewMode.View;
  editingInProcess = false;
  hideSelection = false;
  addTitle: string;
  viewTitle: string;
  editTitle: string;
  deleteTitle: string;

  constructor(private employeeService: EmployeeService, private translation: TranslationService) { }

  ngOnInit() {
    this.translation.translationChanged().subscribe(() => {
      this.addTitle = this.translation.translate('add');
      this.viewTitle = this.translation.translate('view');
      this.editTitle = this.translation.translate('edit');
      this.deleteTitle = this.translation.translate('delete');
    });
    this.employees = this.employeeService.employees;
    this.setDefaultCurrentEmployeeId();
  }

  onCurrentEmpChanged(id: number) {
    this.currentEmployeeId = id;
  }

  onAddClick(event: MouseEvent) {
    this.editingInProcess = true;
    this.hideSelection = true;
    this.viewMode = EmployeeViewMode.Add;
  }

  onDetailsRequested() {
    this.viewMode = EmployeeViewMode.Details;
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
    if (id > -1) {
      this.onCurrentEmpChanged(id);
    } else {
      this.setDefaultCurrentEmployeeId();
    }
  }

  private stopEditing() {
    this.editingInProcess = false;
    this.hideSelection = false;
    this.viewMode = EmployeeViewMode.View;
  }

  private setDefaultCurrentEmployeeId() {
    if (this.employees && this.employees.length > 0) {
      this.currentEmployeeId = this.employees[0].mainInfo.id;
    } else {
      this.currentEmployeeId = -1;
    }
  }

}
