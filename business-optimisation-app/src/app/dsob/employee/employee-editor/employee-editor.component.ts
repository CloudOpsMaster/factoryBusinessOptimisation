import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent implements OnInit, OnChanges {

  @Input() employeeId: number;

  public mainInfo: Employee; // TODO: use dedicated model

  private currentEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.readEmployee();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.employeeId && changes.employeeId.previousValue !== changes.employeeId.currentValue) {
      this.readEmployee();
    }
  }

  onSave() {
    console.log('save');
  }

  onCancel() {
    this.readEmployee();
  }

  private readEmployee() {
    if (this.employeeId > -1) {
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

}
