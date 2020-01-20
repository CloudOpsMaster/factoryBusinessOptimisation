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

   /** data source for grid. Just array of any objects */
   @Input() dataSource: Array<any>;
   /** array of columns to display on grid */
   @Input() columns: Array<GridColumn>;
   /** grid customization options options. Optional. */
   @Input() options: GridOptions = new GridOptions();
   /** is grid locked or not (can accept click or not). Default value is false */
   @Input() locked = false;
   /** hide / show selection for currently selected row. Default value is false */
   @Input() hideSelection = false;
   /** value of tracktionField property for currently selected object/row  */
   @Input() focusEntityId: any;
   /** name of object's field for to track identity */
   @Input() tracktionField: string;
   /** Event that fires on row selection changed. Uses selected object as argument */
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
