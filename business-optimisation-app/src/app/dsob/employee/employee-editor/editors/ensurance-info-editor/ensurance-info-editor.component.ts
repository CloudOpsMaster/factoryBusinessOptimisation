import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { EnsuranceInfo } from 'src/app/models/HR/EnsuranceInfo';

@Component({
  selector: 'app-ensurance-info-editor',
  templateUrl: './ensurance-info-editor.component.html',
  styleUrls: ['./ensurance-info-editor.component.css']
})
export class EnsuranceInfoEditorComponent extends BaseEditor {

  @Input() ensurance: EnsuranceInfo;

  constructor() {
    super();
  }

}
