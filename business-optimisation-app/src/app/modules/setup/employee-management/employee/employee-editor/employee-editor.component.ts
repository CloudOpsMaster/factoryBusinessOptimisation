import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../../../../modules/setup/employee-management/employee/services/employee.service';
import { EmployeeViewMode } from '../../../../../modules/setup/employee-management/employee/employee-view-mode.enum';
import { EmployeeInfo } from '../../../../../modules/setup/employee-management/employee/EmployeeInfo';
import { EmployeeValidationService } from '../../../../../modules/setup/employee-management/employee/services/employee-validation.service';

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

  get saveVisible(): boolean {
    return this.viewMode === EmployeeViewMode.Edit ||
      this.viewMode === EmployeeViewMode.Add;
  }

  get deleteVisible(): boolean {
    return this.viewMode === EmployeeViewMode.Delete;
  }

  constructor(private employeeService: EmployeeService,
    private validationService: EmployeeValidationService) { }

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
      const error = this.validationService.validate(this.employee);
      if (error && error.length > 0) {
        alert(error);
      } else {
        this.employeeService.updateEmployee(this.employee);
        this.saved.emit(this.employee.mainInfo.id);
      }
    }
  }

  onCancel() {
    this.canceled.emit();
  }

  private readEmployee() {
    if (this.employeeId > -1 && this.viewMode !== EmployeeViewMode.Add) {
      this.employee = this.employeeService.employees.find(e => e.mainInfo.id === this.employeeId).clone();
    } else if (this.viewMode === EmployeeViewMode.Add) {
      this.employee = new EmployeeInfo();
    } else {
      this.employee = undefined;
    }
  }

  private getCaption(): string {
    let response = '';
    if (this.viewMode === EmployeeViewMode.Details) {
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
