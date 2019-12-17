import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/HR/Employee';
import { EmployeeViewMode } from '../employee-view-mode.enum';

@Component({
  selector: 'app-employee-info-editor',
  templateUrl: './employee-info-editor.component.html',
  styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent implements OnInit {

  @Input() employee: Employee;
  @Input() viewMode: EmployeeViewMode = EmployeeViewMode.View;

  get editMode(): boolean {
    return this.viewMode !== EmployeeViewMode.View;
  }

  constructor() { }

  ngOnInit() {
    // this.updateForm();
  }


}
