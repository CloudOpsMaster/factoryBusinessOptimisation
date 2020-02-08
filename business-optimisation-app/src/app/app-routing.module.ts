import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagerComponent } from './chapters/employee-management/employee/employee-manager/employee-manager.component';
import { HomeComponent } from './chapters/home/home.component';
import { DayOffFormComponent } from './chapters/employee-management/employee/day-off/day-off-form.component';
import { InstrumentServicesComponent } from './chapters/technical/instrument-services/instrument-services.component';
import { GettingToolsComponent } from "./chapters/warehouse/tools/getting-tools/getting-tools.component";
import { MaterialsDictionaryComponent } from './chapters/warehouse/materials/materials-dictionary/materials-dictionary.component';
import { MeteringComponent } from './chapters/count-register/metering/metering.component';
import { CheckListViewComponent } from './chapters/check-list/check-list-view/check-list-view.component';
import { CheckListEditComponent } from './chapters/check-list/check-list-edit/check-list-edit.component';
import { PositionsManagerComponent } from './chapters/employee-management/employee/positions-manager/positions-manager.component';
import { PlotsComponent } from './chapters/manufacture/plots/plots.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'employee',
    component: EmployeeManagerComponent
  },
  {
    path: 'positions',
    component: PositionsManagerComponent
  },
  {
    path: 'day-off',
    component: DayOffFormComponent
  },
  {
    path: 'instrument-services',
    component: InstrumentServicesComponent
  },
  {
    path: 'gettings-tools',
    component: GettingToolsComponent
  },
  {
    path: 'plots',
    component: PlotsComponent
  },
  {
    path: 'materials-dictionary',
    component: MaterialsDictionaryComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'metering',
    component: MeteringComponent
  },
  {
    path: 'check-list-edit',
    component: CheckListEditComponent
  },
  {
    path: 'check-list-view',
    component: CheckListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
