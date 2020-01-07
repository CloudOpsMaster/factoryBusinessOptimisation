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


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
    EmploymentInfoEditorComponent
  ]
})
export class EmployeeModule { }
