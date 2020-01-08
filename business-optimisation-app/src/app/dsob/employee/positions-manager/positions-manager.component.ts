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
      this.assignIdForNewPosition();
      this.allPositions.push(this.newPosition);
      this.newPosition = new PositionInfo();
      this.refreshData();
   }

   onEdit(position: PositionInfo) {
      if (position.id === this.editPositionId) {
         this.editPositionId = -1;
      } else {
         this.editPositionId = position.id;
      }
   }

   onDeleteClick(position: PositionInfo) {
      this.allPositions = this.allPositions.filter(p => p.id !== position.id);
      this.refreshData();
   }

   onSave(position: PositionInfo) {
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
      this.filteredPositions = this.allPositions.filter(p => p);
      if (this.filter.title && this.filter.title.length > 0) {
         this.filteredPositions = this.filteredPositions.filter(p => p.title.startsWith(this.filter.title));
      }
      if (this.filter.requirements && this.filter.requirements.length > 0) {
         this.filteredPositions = this.filteredPositions.filter(p => p.requirements.includes(this.filter.requirements));
      }
   }

}
