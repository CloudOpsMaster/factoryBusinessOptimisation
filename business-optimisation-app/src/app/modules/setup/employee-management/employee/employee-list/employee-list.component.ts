import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { EmployeeInfo } from '../../../../../modules/setup/employee-management/employee/EmployeeInfo';
import { EmployeeFilter } from './employee-filter/employee-filter';
import { EmployeeFiltrator } from './employee-filter/employee-filtrator';
import { GridColumn } from '../../../../../common/ui/grid/model/grid-column';
import { EmployeeListPresentation } from './employee-list-presentation';
import { TranslationService } from 'angular-l10n';



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

   filteredEmployees: Array<EmployeeListPresentation>;

   columns = new Array<GridColumn>();
   tracktionField = 'id';

   private filter = new EmployeeFilter();

   private personalNumberTitle: string;
   private nameTitle: string;
   private positionTitle: string;
   private changedTitle: string;
   private phoneTitle: string;


   constructor(private translation: TranslationService) { }

   ngOnInit() {
      this.translation.translationChanged().subscribe(() => {
         this.personalNumberTitle = this.translation.translate('personalNumber');
         this.nameTitle = this.translation.translate('namesurnameshort');
         this.positionTitle = this.translation.translate('position');
         this.changedTitle = this.translation.translate('changed');
         this.phoneTitle = this.translation.translate('phone');
      });
      this.prepareGridData();
      this.performFiltering();
      this.focusFirstItem();
   }

   ngOnChanges() {
      this.performFiltering();
      this.focusFirstItem();
   }

   onRowClick(employee: EmployeeListPresentation) {
      if (this.locked || !employee) {
         return;
      }
      this.focusEntityId = employee.id;
      this.currentEmpChanged.emit(this.focusEntityId);
   }

   onApplyFilter(filter: EmployeeFilter) {
      this.filter = filter;
      this.performFiltering();
   }

   private performFiltering() {
      this.filteredEmployees = this.getListPresentation(EmployeeFiltrator.GetFilteredEmployees(this.employees, this.filter));
      this.focusFirstItem();
   }

   // TODO: provide localization
   private getListPresentation(employees: EmployeeInfo[]): EmployeeListPresentation[] {
      const response = new Array<EmployeeListPresentation>();
      if (!employees) {
         return response;
      }
      employees.forEach(emp => {
         const presentation: EmployeeListPresentation = {
            id: emp.mainInfo.id,
            name: emp.mainInfo.shortName,
            positionName: emp.employment.employmentDate ? emp.position.title : 'Уволен',
            changeDate: emp.employment.employmentDate ? emp.employment.employmentDate : emp.employment.dismissalDate,
            phone: emp.contact.phone
         };

         response.push(presentation);
      });
      return response;
   }

   private focusFirstItem() {
      if (this.filteredEmployees && this.filteredEmployees.length > 0) {
         const employeeToFocus = this.filteredEmployees.find(e => e.id === this.focusEntityId);
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
      this.columns.push({ header: this.personalNumberTitle, field: 'id' });
      this.columns.push({ header: this.nameTitle, field: 'name' });
      this.columns.push({ header: this.positionTitle, field: 'positionName' });
      this.columns.push({ header: this.changedTitle, field: 'changeDate' });
      this.columns.push({ header: this.phoneTitle, field: 'phone' });
   }

}
