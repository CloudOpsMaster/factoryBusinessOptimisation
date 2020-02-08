import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagerComponent } from './employee/employee-manager/employee-manager.component';
import { EmployeeListComponent } from '../employee-management/employee/employee-list/employee-list.component';
import { EmployeeEditorComponent } from '../employee-management/employee/employee-editor/employee-editor.component';
import { EmployeeInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/employee-info-editor/employee-info-editor.component';
import { EmployeeFilterComponent } from '../employee-management/employee/employee-list/employee-filter/employee-filter.component';
import { DocumentInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/document-info-editor/document-info-editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdressInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/adress-info-editor/adress-info-editor.component';
import { ContactInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/contact-info-editor/contact-info-editor.component';
import { EducationInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/education-info-editor/education-info-editor.component';
import { EmploymentInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/employment-info-editor/employment-info-editor.component';
import { MedicalInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/medical-info-editor/medical-info-editor.component';
import { EnsuranceInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/ensurance-info-editor/ensurance-info-editor.component';
import { FamilyInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/family-info-editor/family-info-editor.component';
import { PositionsManagerComponent } from '../employee-management/employee/positions-manager/positions-manager.component';
import { PositionCreatorComponent } from '../employee-management/employee/positions-manager/position-creator/position-creator.component';
import { PositionInfoEditorComponent } from '../employee-management/employee/employee-editor/editors/position-info-editor/position-info-editor.component';
import { CommonAppModule } from '../../common/common.module';
import { PositionService } from '../employee-management/employee/positions-manager/services/position.service';
import { PositionSelectorComponent } from '../employee-management/employee/positions-manager/position-selector/position-selector.component';
import { EmploymentManagerComponent } from '../employee-management/employee/employee-editor/editors/employment-manager/employment-manager.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonAppModule
  ],
  declarations: [
    EmployeeManagerComponent,
    EmployeeListComponent,
    EmployeeEditorComponent,
    EmployeeInfoEditorComponent,
    EmployeeFilterComponent,
    DocumentInfoEditorComponent,
    AdressInfoEditorComponent,
    ContactInfoEditorComponent,
    EducationInfoEditorComponent,
    EmploymentInfoEditorComponent,
    MedicalInfoEditorComponent,
    EnsuranceInfoEditorComponent,
    FamilyInfoEditorComponent,
    PositionsManagerComponent,
    PositionInfoEditorComponent,
    PositionCreatorComponent,
    PositionSelectorComponent,
    EmploymentManagerComponent
  ],
  providers: [
    PositionService
  ]

})
export class EmployeeModule { }
