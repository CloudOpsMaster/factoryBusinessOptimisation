import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn } from './model/grid-column';

@Component({
   // tslint:disable-next-line:component-selector
   selector: 'grid',
   templateUrl: './grid.component.html',
   styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

   @Input() dataSource: Array<any>;
   @Input() columns: Array<GridColumn>;
   @Input() locked = false;
   @Input() hideSelection = false;
   @Input() focusEntityId: any; // ???
   @Input() tracktionField: string;
   @Output() currentRowChanged = new EventEmitter<any>();

   constructor() { }

   ngOnInit() {
   }

   onRowClick(data: any) {
      if (this.locked || !data) {
        return;
      }
      this.focusEntityId = this.getFieldValue(data, this.tracktionField);
      this.currentRowChanged.emit(data);
   }

   isSelected(data: any): boolean {
      return !this.hideSelection && this.focusEntityId === this.getFieldValue(data, this.tracktionField);
    }

   private getFieldValue(data: any, field: string): any {
      if (!data || !field) {
         return undefined;
      }
      const parts = field.split('.');
      let fieldValue = data;
      parts.forEach(part => {
       fieldValue = fieldValue[part];
      });
      return fieldValue;
   }

}
