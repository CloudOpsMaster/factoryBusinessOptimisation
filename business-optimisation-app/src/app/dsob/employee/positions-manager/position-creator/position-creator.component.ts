import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
   selector: 'app-position-creator',
   templateUrl: './position-creator.component.html',
   styleUrls: ['./position-creator.component.css']
})
export class PositionCreatorComponent implements OnInit {
   // TODO: refactor this component
   @Output() positionAdded = new EventEmitter();
   newPosition: PositionInfo;
   private allPositions: Array<PositionInfo>;

   get addEnabled(): boolean {
      return this.newPosition.isAllFieldsNotEmpty();
   }

   constructor(private storageService: StorageService) {
      this.newPosition = new PositionInfo();
   }

   ngOnInit() {
      this.readStorage();
   }

   onAdd() {
      const validationError = this.getValidationError(this.newPosition);
      if (validationError.length !== 0) {
         // TODO: provide normal dialog
         alert(validationError);
         return;
      }
      this.assignIdForNewPosition();
      this.allPositions.push(this.newPosition);
      this.newPosition = new PositionInfo();
      this.writeStorage();
      this.positionAdded.emit();
   }

   private assignIdForNewPosition() {
      if (this.allPositions.length > 0) {
         this.newPosition.id = this.allPositions[this.allPositions.length - 1].id + 1;
      } else {
         this.newPosition.id = 1;
      }
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

   private writeStorage() {
      this.storageService.setData(StorageKey.EmployeePositionsStorageKey, this.allPositions);
   }

   private getValidationError(position: PositionInfo): string {
      let response = '';
      if (this.allPositions.some(p => p.title.trim() === position.title.trim())) {
         response = 'Position with such title already exists!';
      }
      return response;
   }

}
