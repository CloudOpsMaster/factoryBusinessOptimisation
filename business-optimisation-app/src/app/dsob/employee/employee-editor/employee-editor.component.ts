import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeViewMode } from '../employee-view-mode.enum';
import { EmployeeInfo } from '../EmployeeInfo';

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

  public employee: EmployeeInfo;

  get buttonsBlockVisible(): boolean {
    return this.viewMode !== EmployeeViewMode.View;
  }
  get caption(): string {
    return this.getCaption();
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.readEmployee();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.readEmployee();
  }

  onSave() {
    if (this.viewMode === EmployeeViewMode.Delete) {
      this.employeeService.deleteEmployee(this.employee);
      this.saved.emit(-1);
    } else {
      // TODO: provide validation
      this.employeeService.updateEmployee(this.employee);
      this.saved.emit(this.employee.mainInfo.id);
    }
  }

  onCancel() {
    this.canceled.emit();
  }

  private readEmployee() {
    if (this.employeeId > -1 && this.viewMode !== EmployeeViewMode.Add) {
      this.employee = this.employeeService.employees.find(e => e.mainInfo.id === this.employeeId).clone();
    } else {
      this.employee = new EmployeeInfo();
    }
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
