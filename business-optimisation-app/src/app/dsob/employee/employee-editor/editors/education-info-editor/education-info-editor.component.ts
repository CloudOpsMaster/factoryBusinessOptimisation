import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { EducationInfo } from 'src/app/models/HR/EducationInfo';

@Component({
  selector: 'app-education-info-editor',
  templateUrl: './education-info-editor.component.html',
  styleUrls: ['./education-info-editor.component.css']
})
export class EducationInfoEditorComponent extends BaseEditor {

  @Input() education: EducationInfo;
  constructor() {
    super();
  }

}
