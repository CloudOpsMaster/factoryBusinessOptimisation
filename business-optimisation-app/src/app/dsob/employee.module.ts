import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagerComponent } from './employee/employee-manager/employee-manager.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditorComponent } from './employee/employee-editor/employee-editor.component';
import { EmployeeInfoEditorComponent } from './employee/employee-editor/editors/employee-info-editor/employee-info-editor.component';
import { EmployeeFilterComponent } from './employee/employee-list/employee-filter/employee-filter.component';
import { DocumentInfoEditorComponent } from './employee/employee-editor/editors/document-info-editor/document-info-editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdressInfoEditorComponent } from './employee/employee-editor/editors/adress-info-editor/adress-info-editor.component';
import { ContactInfoEditorComponent } from './employee/employee-editor/editors/contact-info-editor/contact-info-editor.component';
import { EducationInfoEditorComponent } from './employee/employee-editor/editors/education-info-editor/education-info-editor.component';
import { EmploymentInfoEditorComponent } from './employee/employee-editor/editors/employment-info-editor/employment-info-editor.component';
import { MedicalInfoEditorComponent } from './employee/employee-editor/editors/medical-info-editor/medical-info-editor.component';
import { EnsuranceInfoEditorComponent } from './employee/employee-editor/editors/ensurance-info-editor/ensurance-info-editor.component';
import { FamilyInfoEditorComponent } from './employee/employee-editor/editors/family-info-editor/family-info-editor.component';
import { PositionsManagerComponent } from './employee/positions-manager/positions-manager.component';
import { PositionCreatorComponent } from './employee/positions-manager/position-creator/position-creator.component';
import { PositionInfoEditorComponent } from './employee/employee-editor/editors/position-info-editor/position-info-editor.component';
import { CommonAppModule } from '../common/common.module';

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
    PositionCreatorComponent
  ]
})
export class EmployeeModule { }
