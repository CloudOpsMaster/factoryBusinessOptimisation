import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { LocalizationModule, L10nLoader } from 'angular-l10n';
import { initL10n, l10nConfig } from './localication';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './chapters/home/home.component';
import { CreateMaterialFormComponent } from './chapters/warehouse/materials/create-material-form/create-material-form.component';
import { DayOffFormComponent } from './chapters/employee-management/employee/day-off/day-off-form.component';
import { AddDayOffFormComponent } from './chapters/employee-management/employee/day-off/add-day-off-form/add-day-off-form.component';
import { DayOffListComponent } from './chapters/employee-management/employee/day-off/day-off-list/day-off-list.component';
import { InstrumentServicesComponent } from './chapters/technical/instrument-services/instrument-services.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GettingToolsComponent } from './chapters/warehouse/tools/getting-tools/getting-tools.component';
import { MaterialsDictionaryComponent } from './chapters/warehouse/materials/materials-dictionary/materials-dictionary.component';
import { MeteringComponent } from './chapters/count-register/metering/metering.component';
import { InstrumentServiceFormComponent } from './chapters/technical/instrument-services/instrument-service-form/instrument-service-form.component';
import { InstrumentServiceTableComponent } from './chapters/technical/instrument-services/instrument-service-table/instrument-service-table.component';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableItemComponent } from './chapters/technical/instrument-services/instrument-service-table/instrument-service-table-item/instrument-service-table-item.component';
import { CheckListEditComponent } from './chapters/check-list/check-list-edit/check-list-edit.component';
import { CheckListViewComponent } from './chapters/check-list/check-list-view/check-list-view.component';
import { EmployeeModule } from './chapters/employee-management/employee.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonAppModule } from './common/common.module';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableHistoryComponent } from './chapters/technical/instrument-services/instrument-service-table-history/instrument-service-table-history.component';
import { FacilitiesManagementModule } from './chapters/manufacture/facilities-management/facilities-management.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMaterialFormComponent,
    MaterialsDictionaryComponent,
    DayOffFormComponent,
    AddDayOffFormComponent,
    DayOffListComponent,
    InstrumentServicesComponent,
    InstrumentServiceFormComponent,
    InstrumentServiceTableComponent,
    InstrumentServiceTableItemComponent,
    GettingToolsComponent,
    MeteringComponent,
    CheckListEditComponent,
    CheckListViewComponent,
    InstrumentServiceTableHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    NgSelectModule,
    CommonAppModule,
    FacilitiesManagementModule,
    LocalizationModule.forRoot(l10nConfig)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

