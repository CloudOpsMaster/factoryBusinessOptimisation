import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagerComponent } from './dsob/employee/employee-manager/employee-manager.component';
import { HomeComponent } from './home/home/home.component';
import { DayOffFormComponent } from './ihor/day-off-form/day-off-form.component';
import { InstrumentServicesComponent } from './vdry/instrument-services/instrument-services.component';
import { GettingToolsComponent } from "./mary/getting-tools/getting-tools.component";
import { MaterialsDictionaryComponent } from './yulia/materials-dictionary/materials-dictionary.component';
import { MeteringComponent } from './vadim/metering/metering.component';
import { CheckListComponent } from './vlad/check-list/check-list.component';


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
    path: 'ihor',
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
    path: 'check-list',
    component: CheckListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
