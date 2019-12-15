import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeManagerComponent } from './dsob/employee/employee-manager/employee-manager.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { DayOffFormComponent } from './ihor/day-off-form/day-off-form.component';
import { InstrumentServisesComponent } from './vdry/instrument-servises/instrument-servises.component';


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
    path: 'instrument-servises',
    component: InstrumentServisesComponent
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
