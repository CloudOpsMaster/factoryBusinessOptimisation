import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';
import { WorkPlaceComponent } from './work-place.component';
import { WorkPlaceRoutingModule } from './work-place-routing.module';

@NgModule({
    declarations: [
        WorkPlaceComponent
    ],
    imports: [
        CommonModule,
        WorkPlaceRoutingModule,
        LocalizationModule
    ]
})
export class WorkPlaceModule { }