import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocalizationModule } from 'angular-l10n';
import { LocationFormComponent } from './location-form/location-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationTableComponent } from './location-table/location-table.component';
import { CommonAppModule } from 'src/app/common/common.module';

@NgModule({
  declarations: [ 
    LocationComponent,
    LocationFormComponent,
    LocationTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonAppModule,
    LocationRoutingModule,
    LocalizationModule
  ],
  providers: []
})
export class LocationModule { }