import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/HR/Employee';

@Component({
  selector: 'app-employee-info-editor',
  templateUrl: './employee-info-editor.component.html',
  styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent implements OnInit, OnChanges {

  @Input() employee: Employee;

  inputForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit() {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateForm();
  }

  private updateForm() {
    if (!this.employee) {
      return;
    }
    this.inputForm.setValue({
      firstName: this.employee.firstName,
      secondName: this.employee.secondName,
      patronymic: this.employee.patronymic
    });
  }

}
