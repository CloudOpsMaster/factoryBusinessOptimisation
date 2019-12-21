import { Component, OnInit, Input } from '@angular/core';
import { EmployeeViewMode } from '../../../employee-view-mode.enum';
import { EmployeeMainInfo } from '../../../EmployeeInfo';

@Component({
  selector: 'app-employee-info-editor',
  templateUrl: './employee-info-editor.component.html',
  styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent implements OnInit {

  @Input() mainInfo: EmployeeMainInfo;
  @Input() viewMode: EmployeeViewMode = EmployeeViewMode.View;

  get editMode(): boolean {
    return this.viewMode !== EmployeeViewMode.View;
  }

  constructor() { }

  ngOnInit() {
    // this.updateForm();
  }


}
