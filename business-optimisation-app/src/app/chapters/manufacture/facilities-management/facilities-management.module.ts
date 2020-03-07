import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitiesManagementComponent } from './facilities-management.component';
import { FacilitiesManagementRoutingModule } from './facilities-management-routing.module';
import { LocalizationModule } from 'angular-l10n';
import { CommonAppModule } from 'src/app/common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FacilitiesManagementComponent
  ],
  imports: [
    CommonModule,
    FacilitiesManagementRoutingModule,
    LocalizationModule,
    ReactiveFormsModule
  ]
})
export class FacilitiesManagementModule { }