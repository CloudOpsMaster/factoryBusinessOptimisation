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

   ngOnInit(): void {
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
