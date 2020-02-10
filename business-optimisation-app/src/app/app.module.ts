import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { LocalizationModule, L10nLoader, L10nConfig, LogLevel } from 'angular-l10n';
import { EN } from 'src/assets/languages/en';
import { RU } from 'src/assets/languages/ru';

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
import { PlotsComponent } from './chapters/manufacture/plots/plots.component';
import { PlotsFormComponent } from './chapters/manufacture/plots/plots-form/plots-form.component';
import { PlotsTableComponent } from './chapters/manufacture/plots/plots-table/plots-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonAppModule } from './common/common.module';
import { TableForPlotsComponent } from './chapters/manufacture/plots/plots-table/table-for-plots/table-for-plots.component';
import { TableWorkSiteForGuildComponent } from './chapters/manufacture/plots/plots-table/work-site/table-work-site-for-guild/table-work-site-for-guild.component';
import { LocationFormComponent } from './chapters/manufacture/plots/plots-table/table-for-location/location-form/location-form.component';
import { WorkSiteFormComponent } from './chapters/manufacture/plots/plots-table/work-site/work-site-form/work-site-form.component';
import { TableWorkSiteForOfficeComponent } from './chapters/manufacture/plots/plots-table/work-site/table-work-site-for-office/table-work-site-for-office.component';
// tslint:disable-next-line:max-line-length
import { InstrumentServiceTableHistoryComponent } from './chapters/technical/instrument-services/instrument-service-table-history/instrument-service-table-history.component';
import { TableForLocationComponent } from './chapters/manufacture/plots/plots-table/table-for-location/table-for-location.component';

const l10nConfig: L10nConfig = {
  logger: {
    level: LogLevel.Warn
  },
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'ru', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'ru', countryCode: 'RU' },
  },
  translation: {
    translationData: [
      { languageCode: 'en', data: EN },
      { languageCode: 'ru', data: RU }
    ],
    missingValue: 'No key'
  }
};

export function initL10n(l10nLoader: L10nLoader): Function {
  return () => l10nLoader.load();
}

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
    PlotsComponent,
    PlotsFormComponent,
    PlotsTableComponent,
    TableForPlotsComponent,
    TableWorkSiteForOfficeComponent,
    TableForLocationComponent,
    TableWorkSiteForGuildComponent,
    LocationFormComponent,
    WorkSiteFormComponent,
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

export class AppModule { }

