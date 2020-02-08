import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { ContactInfo } from 'src/app/models/hr/contact-info';

@Component({
  selector: 'app-contact-info-editor',
  templateUrl: './contact-info-editor.component.html',
  styleUrls: ['./contact-info-editor.component.css']
})
export class ContactInfoEditorComponent extends BaseEditor {

  @Input() contact: ContactInfo;
  constructor() {
    super();
  }

}
