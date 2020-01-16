import { Component, OnInit } from '@angular/core';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { PositionService } from './services/position.service';

@Component({
   selector: 'app-positions-manager',
   templateUrl: './positions-manager.component.html',
   styleUrls: ['./positions-manager.component.css']
})
export class PositionsManagerComponent implements OnInit {

   filteredPositions: Array<PositionInfo>;
   filter: PositionInfo;

   get filterEnabled(): boolean {
      return (this.filter.title && this.filter.title.length > 0)
            || (this.filter.requirements && this.filter.requirements.length > 0);
   }

   private allPositions: Array<PositionInfo>;
   private editPositionId = -1;

   constructor(private positionService: PositionService) {
      this.filter = new PositionInfo();
   }

   ngOnInit() {
      this.refreshData();
   }

   onPositionAdded() {
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
      this.positionService.deletePosition(position);
      this.refreshData();
   }

   onSave(position: PositionInfo) {
      const response = this.positionService.updatePosition(position);
      if (!response.success) {
         // TODO: provide normal dialog
         alert(response.error);
         return;
      }
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

   showCancelBtnFor(position): boolean {
      if (position.id === this.editPositionId) {
         return true;
      } else {
         return false;
      }
   }

   getTextClassFor(position: PositionInfo): string {
      if (position.id === this.editPositionId) {
         return 'fullWidth enabledText';
      } else {
         return 'fullWidth disabledText';
      }
   }

   saveDisabledFor(position): boolean {
      return position.id !== this.editPositionId;
   }

   private refreshData() {
      this.allPositions = this.positionService.AllPositions;
      this.applyFiltration();
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

   private restoreFieldsFor(position: PositionInfo) {
      const originalPosition = this.allPositions.find(p => p.id === position.id);
      position.initFrom(originalPosition);
   }

}
