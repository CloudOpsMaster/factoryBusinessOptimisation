import { Component, Input, Output } from '@angular/core';
import { EmployeeMainInfo } from '../../../EmployeeInfo';
import { BaseEditor } from '../base-editor';

@Component({
   selector: 'app-employee-info-editor',
   templateUrl: './employee-info-editor.component.html',
   styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent extends BaseEditor {

   @Input() mainInfo: EmployeeMainInfo;
   @Input() showId = false;

   onModelChange(path: any) {
      console.log('path:', path);
   }
   constructor() {
      super();
   }

}
