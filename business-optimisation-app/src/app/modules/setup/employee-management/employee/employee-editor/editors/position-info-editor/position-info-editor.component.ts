import { Component, OnInit, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { PositionInfo } from '../../../../../../../models/hr/position-info';

@Component({
   selector: 'app-position-info-editor',
   templateUrl: './position-info-editor.component.html',
   styleUrls: ['./position-info-editor.component.css']
})
export class PositionInfoEditorComponent extends BaseEditor implements OnInit {

   @Input() position: PositionInfo;
   creationMode = false;

   get createNewCaption(): string {
      if (this.creationMode) {
         return 'Отмена создания новой должности';
      } else {
         return 'Создание новой должности';
      }
   }

   ngOnInit(): void {
   }

   onCreateNewPosition() {
      this.creationMode = !this.creationMode;
   }

   onPositionAdded() {
      this.creationMode = false;
   }

   constructor() {
      super();
   }

}
