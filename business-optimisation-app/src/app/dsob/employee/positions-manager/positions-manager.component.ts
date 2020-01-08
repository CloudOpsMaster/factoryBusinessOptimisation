import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';

@Component({
   selector: 'app-positions-manager',
   templateUrl: './positions-manager.component.html',
   styleUrls: ['./positions-manager.component.css']
})
export class PositionsManagerComponent implements OnInit {

   filteredPositions: Array<PositionInfo>;
   newPosition: PositionInfo;
   filter: PositionInfo;

   get addEnabled(): boolean {
      return this.newPosition.isAllFieldsNotEmpty();
   }
   get filterEnabled(): boolean {
      return (this.filter.title && this.filter.title.length > 0)
            || (this.filter.requirements && this.filter.requirements.length > 0);
   }

   private allPositions: Array<PositionInfo>;
   private editPositionId = -1;

   constructor(private storageService: StorageService) {
      this.newPosition = new PositionInfo();
      this.filter = new PositionInfo();
   }

   ngOnInit() {
      this.readStorage();
      this.applyFiltration();
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
      this.refreshData();
   }

   onEdit(position: PositionInfo) {
      if (position.id === this.editPositionId) {
         this.editPositionId = -1;
         this.restoreFieldsFor(position);
      } else {
         if (this.editPositionId > -1) {
            const positionToUpdate = this.filteredPositions.find(p => p.id === this.editPositionId);
            this.restoreFieldsFor(positionToUpdate);
         }
         this.editPositionId = position.id;
      }
   }

   onDeleteClick(position: PositionInfo) {
      this.allPositions = this.allPositions.filter(p => p.id !== position.id);
      this.refreshData();
   }

   onSave(position: PositionInfo) {
      const validationError = this.getValidationError(position);
      if (validationError.length !== 0) {
         // TODO: provide normal dialog
         alert(validationError);
         return;
      }
      const currentPosition = this.allPositions.find(p => p.id === position.id);
      currentPosition.title = position.title;
      currentPosition.requirements = position.requirements;
      this.editPositionId = -1;
      this.refreshData();
   }

   onFilterClick() {
      this.applyFiltration();
   }

   onFilterClearClick() {
      this.filter = new PositionInfo();
      this.applyFiltration();
   }

   isReadonlyForPosition(position: PositionInfo) {
      return position.id !== this.editPositionId;
   }

   editCaptionFor(position): string {
      if (position.id === this.editPositionId) {
         return 'Отмена';
      } else {
         return 'Изменить';
      }
   }

   editButtonClassFor(position): string {
      if (position.id === this.editPositionId) {
         return 'btn btn-light btn-sm';
      } else {
         return 'btn btn-warning btn-sm';
      }
   }

   getTextClassFor(position: PositionInfo): string {
      if (position.id === this.editPositionId) {
         return 'fullWidth enabledText';
      } else {
         return 'fullWidth disabledText';
      }
   }

   saveVisibleFor(position): boolean {
      return position.id === this.editPositionId;
   }

   private refreshData() {
      this.writeStorage();
      this.readStorage();
      this.applyFiltration();
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

   private assignIdForNewPosition() {
      if (this.allPositions.length > 0) {
         this.newPosition.id = this.allPositions[this.allPositions.length - 1].id + 1;
      } else {
         this.newPosition.id = 1;
      }
   }

   private applyFiltration() {
      this.filteredPositions = new Array<PositionInfo>();
      this.allPositions.forEach(p => {
         this.filteredPositions.push(p.clone());
      });
      if (this.filter.title && this.filter.title.length > 0) {
         this.filteredPositions = this.filteredPositions.filter(p => p.title.toUpperCase().startsWith(this.filter.title.toUpperCase()));
      }
      if (this.filter.requirements && this.filter.requirements.length > 0) {
         this.filteredPositions =
            this.filteredPositions.filter(p => p.requirements.toUpperCase().includes(this.filter.requirements.toUpperCase()));
      }
   }

   private getValidationError(position: PositionInfo): string {
      let response = '';
      if (this.allPositions.some(p => p.title.trim() === position.title.trim())) {
         response = 'Position with such title already exists!';
      }
      return response;
   }

   private restoreFieldsFor(position: PositionInfo) {
      const originalPosition = this.allPositions.find(p => p.id === position.id);
      position.initFrom(originalPosition);
   }

}
