import { Component, Input } from '@angular/core';
import { DocumentInfo } from 'src/app/models/HR/DocumentInfo';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-document-info-editor',
  templateUrl: './document-info-editor.component.html',
  styleUrls: ['./document-info-editor.component.css']
})
export class DocumentInfoEditorComponent extends BaseEditor {

  @Input() document: DocumentInfo;
  constructor() {
    super();
  }

}
