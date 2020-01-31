import { Component, Input } from '@angular/core';
import { EmployeeMainInfo } from '../../../EmployeeInfo';
import { BaseEditor } from '../base-editor';
import { ImageDescription } from '../../../../../common/ui/image-chooser/model/image-description';

@Component({
   selector: 'app-employee-info-editor',
   templateUrl: './employee-info-editor.component.html',
   styleUrls: ['./employee-info-editor.component.css']
})
export class EmployeeInfoEditorComponent extends BaseEditor {

   @Input() mainInfo: EmployeeMainInfo;
   @Input() showId = false;

   constructor() {
      super();
   }

   onImageChanged(image: ImageDescription) {
      this.mainInfo.photo = image.srcBase64;
   }

   onSignatureChanged(image: ImageDescription) {
      this.mainInfo.signature = image.srcBase64;
   }

}
