import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-info-editor',
  templateUrl: './employee-info-editor.component.html',
  styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent implements OnInit, OnChanges {

  @Input() employeeId: number;

  inputForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required)
  });

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


  private readEmployee() {
    if (this.employeeId > -1) {
      this.currentEmployee = this.employeeService.employees.find(e => e.id === this.employeeId);
    }
    this.updateForm();
  }

  private updateForm() {
    if (!this.currentEmployee) {
      return;
    }
    this.inputForm.setValue({
      firstName: this.currentEmployee.firstName,
      secondName: this.currentEmployee.secondName,
      patronymic: this.currentEmployee.patronymic
    });
  }

}
