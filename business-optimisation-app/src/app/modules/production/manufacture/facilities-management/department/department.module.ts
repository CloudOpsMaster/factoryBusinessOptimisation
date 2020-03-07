import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { LocalizationModule } from 'angular-l10n';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  declarations: [ DepartmentComponent],
  imports: [
    CommonModule,
    RouterModule,
    DepartmentRoutingModule,
    LocalizationModule
  ],
  providers: []
})
export class DepartmentModule { }