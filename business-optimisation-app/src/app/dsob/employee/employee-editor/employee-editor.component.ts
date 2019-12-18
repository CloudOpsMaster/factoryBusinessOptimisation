import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/HR/Employee';
import { EmployeeViewMode } from '../employee-view-mode.enum';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent implements OnInit, OnChanges {

  @Input() employeeId: number;
  @Input() viewMode: EmployeeViewMode = EmployeeViewMode.View;
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter<number>();

  public mainInfo: Employee; // TODO: use dedicated model

  get buttonsBlockVisible(): boolean {
    return this.viewMode !== EmployeeViewMode.View;
  }
  get caption(): string {
    return this.getCaption();
  }

  private currentEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.readEmployee();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.readEmployee();
  }

  onSave() {
    this.saved.emit(0);
  }

  onCancel() {
    this.canceled.emit();
  }

  private readEmployee() {
    if (this.employeeId > -1 && this.viewMode !== EmployeeViewMode.Add) {
      this.currentEmployee = this.employeeService.employees.find(e => e.id === this.employeeId);
    } else {
      this.currentEmployee = new Employee();
    }
    this.updateMainInfo();
  }

  private updateMainInfo() {
    this.mainInfo = new Employee();
    this.mainInfo.firstName = this.currentEmployee.firstName || '';
    this.mainInfo.secondName = this.currentEmployee.secondName || '';
    this.mainInfo.patronymic = this.currentEmployee.patronymic || '';
  }

  private getCaption(): string {
    let response = '';
    if (this.viewMode === EmployeeViewMode.View) {
      response = 'Сотрудник - детали';
    } else if (this.viewMode === EmployeeViewMode.Edit) {
      response = 'Сотрудник - редактирование';
    } else if (this.viewMode === EmployeeViewMode.Delete) {
      response = 'Сотрудник - удаление';
    } else if (this.viewMode === EmployeeViewMode.Add) {
      response = 'Сотрудник - добавление';
    }
    return response;
  }

}
