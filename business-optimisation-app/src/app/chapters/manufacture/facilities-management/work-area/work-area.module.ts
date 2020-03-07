import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';
import { WorkAreaComponent } from './work-area.component';
import { WorkAreaRoutingModule } from './work-area-routing.module';

@NgModule({
    declarations: [
        WorkAreaComponent
    ],
    imports: [
        CommonModule,
        WorkAreaRoutingModule,
        LocalizationModule
    ]
})
export class WorkAreaModule { }