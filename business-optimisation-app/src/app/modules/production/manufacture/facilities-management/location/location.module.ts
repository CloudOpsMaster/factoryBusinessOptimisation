import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocalizationModule } from 'angular-l10n';
import { LocationFormComponent } from './location-form/location-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ LocationComponent, LocationFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    LocationRoutingModule,
    LocalizationModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class LocationModule { }