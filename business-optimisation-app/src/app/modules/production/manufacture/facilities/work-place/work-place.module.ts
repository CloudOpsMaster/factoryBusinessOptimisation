import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';
import { WorkPlaceComponent } from './work-place.component';
import { WorkPlaceRoutingModule } from './work-place-routing.module';
import { WorkPlaceFormComponent } from './work-place-form/work-place-form.component';
import { WorkPlaceTableComponent } from './work-place-table/work-place-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonAppModule } from 'src/app/common/common.module';

@NgModule({
    declarations: [
        WorkPlaceComponent,
        WorkPlaceFormComponent,
        WorkPlaceTableComponent
    ],
    imports: [
        CommonModule,
        CommonAppModule,
        WorkPlaceRoutingModule,
        LocalizationModule,
        ReactiveFormsModule
    ]
})
export class WorkPlaceModule { }