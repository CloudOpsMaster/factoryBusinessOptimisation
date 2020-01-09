import { Component, OnInit, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { PositionInfo } from '../../../../../models/HR/PositionInfo';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
   selector: 'app-position-info-editor',
   templateUrl: './position-info-editor.component.html',
   styleUrls: ['./position-info-editor.component.css']
})
export class PositionInfoEditorComponent extends BaseEditor implements OnInit {

   @Input() position: PositionInfo;
   allPositions = new Array<PositionInfo>();
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
      this.readStorage();
   }

   constructor(private storageService: StorageService) {
      super();
      this.readStorage();
   }

   private readStorage() {
      this.allPositions = this.storageService.getData(StorageKey.EmployeePositionsStorageKey)
         || new Array<PositionInfo>();
      this.allPositions = this.allPositions.map(p => {
         const info = new PositionInfo();
         info.initFrom(p);
         return info;
      });
   }

}
