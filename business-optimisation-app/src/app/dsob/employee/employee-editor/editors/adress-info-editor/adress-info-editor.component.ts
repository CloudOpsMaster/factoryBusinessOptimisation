import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { AdressInfo } from '../../../../../models/HR/AdressInfo';

@Component({
  selector: 'app-adress-info-editor',
  templateUrl: './adress-info-editor.component.html',
  styleUrls: ['./adress-info-editor.component.css']
})
export class AdressInfoEditorComponent extends BaseEditor {

   @Input() adress: AdressInfo;
   constructor() {
     super();
   }

}
