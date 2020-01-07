import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { EmploymentInfo } from 'src/app/models/HR/EmploymentInfo';

@Component({
  selector: 'app-employment-info-editor',
  templateUrl: './employment-info-editor.component.html',
  styleUrls: ['./employment-info-editor.component.css']
})
export class EmploymentInfoEditorComponent extends BaseEditor {

  @Input() employment: EmploymentInfo;

  get reasonReadonly(): boolean {
    return !this.editMode || !this.employment.dismissalDate;
  }
  constructor() {
    super();
  }

}
