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
    DocumentInfoEditorComponent
  ]
})
export class EmployeeModule { }
