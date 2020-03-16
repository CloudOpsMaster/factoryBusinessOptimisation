import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';
import { DepartmentComponent } from './department.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonAppModule} from 'src/app/common/common.module';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentTableComponent } from './department-table/department-table.component';

@NgModule({
  declarations: [ 
    DepartmentComponent,
    DepartmentFormComponent,
    DepartmentTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonAppModule,
    DepartmentRoutingModule,
    LocalizationModule
  ],
  providers: []
})
export class DepartmentModule { }