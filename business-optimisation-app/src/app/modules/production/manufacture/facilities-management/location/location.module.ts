import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocalizationModule } from 'angular-l10n';
import { LocationFormComponent } from './location-form/location-form.component';
import { CommonAppModule } from 'src/app/common/common.module';
import { HomeComponent } from 'src/app/chapters/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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