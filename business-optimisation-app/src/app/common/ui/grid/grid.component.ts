import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn } from './model/grid-column';
import { GridOptions } from './model/grid-options';

@Component({
   // tslint:disable-next-line:component-selector
   selector: 'grid',
   templateUrl: './grid.component.html',
   styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

   @Input() dataSource: Array<any>;
   @Input() columns: Array<GridColumn>;
   @Input() options: GridOptions = new GridOptions();
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

   getRowClassFor(data: any): string {
      let response = '';
      const isSelected = !this.hideSelection
                        && this.focusEntityId === this.getFieldValue(data, this.tracktionField);
      if (isSelected) {
         response = this.options.selectedRowClass;
      }
      return response;
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
