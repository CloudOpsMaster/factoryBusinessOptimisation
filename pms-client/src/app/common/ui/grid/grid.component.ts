import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn } from './model/grid-column';
import { GridService } from './service/grid.service';
declare var require: any;
@Component({
   // tslint:disable-next-line:component-selector
   selector: 'grid',
   templateUrl: './grid.component.html',
   styleUrls: [
      './grid.component.css',
      '../style.scss'
   ]
})
export class GridComponent implements OnInit {

   /** data source for grid. Just array of any objects */
   @Input() dataSource: Array<any>;
   /** array of columns to display on grid */
   @Input() columns: Array<GridColumn>;
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
   
   readonly selectedRowClass = 'mytable-active';
   readonly sortUndefined = require('../assets/sort-undefined.png');
   readonly sortDown = require('../assets/sort-down.png');
   readonly sortUp = require('../assets/sort-up.png');

   constructor(private gridService: GridService) { }

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
         response = this.selectedRowClass;
      }
      return response;
   }

   getSortCaptionFor(column: GridColumn): string {
      const direction = this.gridService.getDirectionForField(column.field);
      let response = this.sortUndefined;
      if (direction === -1) {
         response = this.sortDown;
      }
      else if (direction === 1) {
         response = this.sortUp;
      }
      return response;
   }

   sortBy(column: GridColumn) {
      this.gridService.sortRecords(this.dataSource, column.field);
   }

   filter(column: GridColumn): void {

   }

   getFieldValue(data: any, field: string): any {
      return this.gridService.getFieldValue(data, field);
   }
}