import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitiesComponent } from './facilities.component';
import { FacilitiesRoutingModule } from './facilities-routing.module';
import { LocalizationModule } from 'angular-l10n';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FacilitiesComponent
  ],
  imports: [
    CommonModule,
    FacilitiesRoutingModule,
    LocalizationModule,
    ReactiveFormsModule
  ]
})
export class FacilitiesModule { }