import { Injectable } from '@angular/core';

@Injectable()
export class GridService {
   private sortingDirections = new Map<string, number>();
   private currentSortingField = '';
   private singleColumnSorting = true; // TODO: provide multicolumn sorting

   sortRecords(records: Array<any>, byField: string) {
      if (!records || records.length === 0 || !byField || byField.length === 0) {
         return;
      }
      this.currentSortingField = byField;
      this.updateSortDirections(byField);
      records.sort(this.sortFunction);
   }

   getDirectionForField(field: string): number {
      let response = 0; // no sorting at all
      if (this.sortingDirections.has(field)) {
         response = this.sortingDirections.get(field);
      }
      return response;
   }

   getFieldValue(data: any, field: string): any {
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

   constructor() { }

   private sortFunction = (record1: any, record2: any): number => {
      const value1 = this.getFieldValue(record1, this.currentSortingField);
      const value2 = this.getFieldValue(record2, this.currentSortingField);
      const type1 = typeof(value1);
      const type2 = typeof(value2);
      if (type1 !== type2) {
         return 0; // can not sort data of different types;
      }
      let response = 0;
      if (type1 === 'string') {
         response = this.compareStrings(value1, value2);
      } else if (type1 === 'number') {
         response =  value1 > value2 ? 1 : -1;
      }
      return response * this.getDirectionForField(this.currentSortingField);
   }

   private updateSortDirections(field: string) {
      if (this.singleColumnSorting) {
         // reset all sorted direction except current one
         this.sortingDirections.forEach((value, key, map) => {
            if (key !== field) {
               this.sortingDirections.set(key, 0);
            }
         });
      }
      if (this.sortingDirections.has(field)) {

         let value = this.sortingDirections.get(field);
         if (value === 0) {
            value = 1;
         } else {
            value = value * -1;
         }
         this.sortingDirections.set(field, value);
      } else {
         this.sortingDirections.set(field, 1);
      }
   }

   private compareStrings(value1: string, value2: string): number {
      let result = 0;
      if (!value1 && !value2) {
         result = 0;
      } else if (!value1 && value2) {
         result = 1;
      } else if (value1 && !value2) {
         result = -1;
      } else {
         result = value1.localeCompare(value2);
      }
      return result;
   }

   private compareDates(value1: Date, value2: Date): number {
      let result = 0;
      if (!value1 && !value2) {
         result = 0;
      } else if (!value1 && value2) {
         result = 1;
      } else if (value1 && !value2) {
         result = -1;
      } else {
         result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return result;
   }

}
