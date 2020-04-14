import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';
import { WorkAreaComponent } from './work-area.component';
import { WorkAreaRoutingModule } from './work-area-routing.module';
import { WorkAreaFormComponent } from './work-area-form/work-area-form.component';
import { WorkAreaTableComponent } from './work-area-table/work-area-table.component';
import { CommonAppModule } from 'src/app/common/common.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        WorkAreaComponent,
        WorkAreaFormComponent,
        WorkAreaTableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CommonAppModule,
        WorkAreaRoutingModule,
        LocalizationModule
    ]
})
export class WorkAreaModule { }