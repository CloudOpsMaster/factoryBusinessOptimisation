import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { FamilyInfo } from 'src/app/models/HR/FamilyInfo';

@Component({
  selector: 'app-family-info-editor',
  templateUrl: './family-info-editor.component.html',
  styleUrls: ['./family-info-editor.component.css']
})
export class FamilyInfoEditorComponent extends BaseEditor {

  @Input() family: FamilyInfo;

  constructor() {
    super();
  }


}
