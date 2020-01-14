import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { CreateMaterialFormComponent } from './yulia/create-material-form/create-material-form.component';
import { DayOffFormComponent } from './ihor/day-off-form/day-off-form.component';
import { InstrumentServicesComponent } from './vdry/instrument-services/instrument-services.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GettingToolsComponent } from './mary/getting-tools/getting-tools.component';
import { MaterialsDictionaryComponent } from './yulia/materials-dictionary/materials-dictionary.component';
import { MeteringComponent } from './vadim/metering/metering.component';
import { InstrumentServiceFormComponent } from './vdry/instrument-services/instrument-service-form/instrument-service-form.component';
import { InstrumentServiceTableComponent } from './vdry/instrument-services/instrument-service-table/instrument-service-table.component';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableItemComponent } from './vdry/instrument-services/instrument-service-table/instrument-service-table-item/instrument-service-table-item.component';
import { CheckListComponent } from './vlad/check-list/check-list.component';
import { EmployeeModule } from './dsob/employee.module';
import { PlotsComponent } from './mary/plots/plots.component';
import { PlotsFormComponent } from './mary/plots/plots-form/plots-form.component';
import { PlotsTableComponent } from './mary/plots/plots-table/plots-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonAppModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMaterialFormComponent,
    MaterialsDictionaryComponent,
    DayOffFormComponent,
    InstrumentServicesComponent,
    InstrumentServiceFormComponent,
    InstrumentServiceTableComponent,
    InstrumentServiceTableItemComponent,
    GettingToolsComponent,
    MeteringComponent,
    CheckListComponent,
    PlotsComponent,
    PlotsFormComponent,
    PlotsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    NgSelectModule,
    CommonAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
