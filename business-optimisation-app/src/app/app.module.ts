import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagerComponent } from './dsob/employee/employee-manager/employee-manager.component';
import { HomeComponent } from './home/home/home.component';
import { CreateMaterialFormComponent } from './yulia/create-material-form/create-material-form.component';
import { DayOffFormComponent } from './ihor/day-off-form/day-off-form.component';
import { InstrumentServisesComponent } from './vdry/instrument-servises/instrument-servises.component';
import { EmployeeListComponent } from './dsob/employee/employee-list/employee-list.component';
import { EmployeeInfoEditorComponent } from './dsob/employee/employee-info-editor/employee-info-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeManagerComponent,
    EmployeeListComponent,
    EmployeeInfoEditorComponent,
    CreateMaterialFormComponent,
    DayOffFormComponent,
    InstrumentServisesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
