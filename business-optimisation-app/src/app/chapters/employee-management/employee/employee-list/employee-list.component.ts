import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { EmployeeInfo } from '../../../../chapters/employee-management/employee/EmployeeInfo';
import { EmployeeFilter } from './employee-filter/employee-filter';
import { EmployeeFiltrator } from './employee-filter/employee-filtrator';
import { GridColumn } from '../../../../common/ui/grid/model/grid-column';

@Component({
   selector: 'app-employee-list',
   templateUrl: './employee-list.component.html',
   styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {
   @Input() employees: Array<EmployeeInfo>;
   @Input() locked = false;
   @Input() hideSelection = false;
   @Input() focusEntityId = 0;
   @Output() currentEmpChanged = new EventEmitter<number>();

   filteredEmployees: Array<EmployeeInfo>;

   columns = new Array<GridColumn>();
   tracktionField = 'mainInfo.id';

   private filter = new EmployeeFilter();

   constructor() { }

   ngOnInit() {
      this.prepareGridData();
      this.performFiltering();
      this.focusFirstItem();
   }

   ngOnChanges() {
      this.performFiltering();
      this.focusFirstItem();
   }

   onRowClick(employee: EmployeeInfo) {
      if (this.locked || !employee) {
         return;
      }
      this.focusEntityId = employee.mainInfo.id;
      this.currentEmpChanged.emit(this.focusEntityId);
   }

   onApplyFilter(filter: EmployeeFilter) {
      this.filter = filter;
      this.performFiltering();
   }

   private performFiltering() {
      this.filteredEmployees = EmployeeFiltrator.GetFilteredEmployees(this.employees, this.filter);
      this.focusFirstItem();
   }

   private focusFirstItem() {
      if (this.filteredEmployees && this.filteredEmployees.length > 0) {
         const employeeToFocus = this.filteredEmployees.find(e => e.mainInfo.id === this.focusEntityId);
         if (employeeToFocus) {
            this.onRowClick(employeeToFocus);
         } else {
            this.onRowClick(this.filteredEmployees[0]);
         }
      } else {
         this.currentEmpChanged.emit(-1);
      }
   }

   private prepareGridData() {
      this.columns.push({ header: 'Таб.№', field: 'mainInfo.id' });
      this.columns.push({ header: 'ФИО', field: 'mainInfo.shortName' });
      this.columns.push({ header: 'Должность', field: 'position.title' });
      this.columns.push({ header: 'Работает с', field: 'employment.employmentDate' });
      this.columns.push({ header: 'Телефон', field: 'contact.phone' });
   }

}
