import { Component, OnInit, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { ContactInfo } from 'src/app/models/HR/ContactInfo';

@Component({
  selector: 'app-contact-info-editor',
  templateUrl: './contact-info-editor.component.html',
  styleUrls: ['./contact-info-editor.component.css']
})
export class ContactInfoEditorComponent extends BaseEditor  {

  @Input() contact: ContactInfo;
  constructor() {
    super();
  }

}
