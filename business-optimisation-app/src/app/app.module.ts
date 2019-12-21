import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeManagerComponent } from './dsob/employee/employee-manager/employee-manager.component';
import { HomeComponent } from './home/home/home.component';
import { CreateMaterialFormComponent } from './yulia/create-material-form/create-material-form.component';
import { DayOffFormComponent } from './ihor/day-off-form/day-off-form.component';
import { InstrumentServicesComponent } from './vdry/instrument-services/instrument-services.component';
import { EmployeeListComponent } from './dsob/employee/employee-list/employee-list.component';
import { EmployeeInfoEditorComponent } from './dsob/employee/employee-editor/editors/employee-info-editor/employee-info-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GettingToolsComponent } from './mary/getting-tools/getting-tools.component';
import { MaterialsDictionaryComponent } from './yulia/materials-dictionary/materials-dictionary.component';
import { EmployeeEditorComponent } from './dsob/employee/employee-editor/employee-editor.component';
import { MeteringComponent } from './vadim/metering/metering.component';
import { InstrumentServiceFormComponent } from './vdry/instrument-services/instrument-service-form/instrument-service-form.component';
import { InstrumentServiceTableComponent } from './vdry/instrument-services/instrument-service-table/instrument-service-table.component';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableItemComponent } from './vdry/instrument-services/instrument-service-table/instrument-service-table-item/instrument-service-table-item.component';
import { CheckListComponent } from './vlad/check-list/check-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeManagerComponent,
    EmployeeListComponent,
    EmployeeEditorComponent,
    EmployeeInfoEditorComponent,
    CreateMaterialFormComponent,
    MaterialsDictionaryComponent,
    DayOffFormComponent,
    InstrumentServicesComponent,
    InstrumentServiceFormComponent,
    InstrumentServiceTableComponent,
    InstrumentServiceTableItemComponent,
    GettingToolsComponent,
    MeteringComponent,
    CheckListComponent
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
