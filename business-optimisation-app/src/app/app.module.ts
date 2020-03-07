import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { LocalizationModule, L10nLoader } from 'angular-l10n';
import { initL10n, l10nConfig } from './localication';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/shared/home/home.component';
import { CreateMaterialFormComponent } from './modules/production/warehouse/materials/create-material-form/create-material-form.component';
import { DayOffFormComponent } from './modules/setup/employee-management/employee/day-off/day-off-form.component';
import { AddDayOffFormComponent } from './modules/setup/employee-management/employee/day-off/add-day-off-form/add-day-off-form.component';
import { DayOffListComponent } from './modules/setup/employee-management/employee/day-off/day-off-list/day-off-list.component';
import { InstrumentServicesComponent } from './modules/production/technical/instrument-services/instrument-services.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GettingToolsComponent } from './modules/production/warehouse/tools/getting-tools/getting-tools.component';
import { MaterialsDictionaryComponent } from './modules/production/warehouse/materials/materials-dictionary/materials-dictionary.component';
import { MeteringComponent } from './modules/production/count-register/metering/metering.component';
import { InstrumentServiceFormComponent } from './modules/production/technical/instrument-services/instrument-service-form/instrument-service-form.component';
import { InstrumentServiceTableComponent } from './modules/production/technical/instrument-services/instrument-service-table/instrument-service-table.component';
// tslint:disable-next-line:max-line-length
import { FacilitiesManagementModule } from './modules/production/manufacture/facilities-management/facilities-management.module';
import { InstrumentServiceTableItemComponent } from './modules/production/technical/instrument-services/instrument-service-table/instrument-service-table-item/item.component';
import { CheckListEditComponent } from './modules/production/check-list/check-list-edit/check-list-edit.component';
import { CheckListViewComponent } from './modules/production/check-list/check-list-view/check-list-view.component';
import { EmployeeModule } from './modules/setup/employee-management/employee.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonAppModule } from './common/common.module';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableHistoryComponent } from './modules/production/technical/instrument-services/instrument-service-table-history/instrument-service-table-history.component';

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
export class AppModule {}
