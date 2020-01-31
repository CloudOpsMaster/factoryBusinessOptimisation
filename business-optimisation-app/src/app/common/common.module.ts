import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from './ui/combo-box/combo-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveButtonComponent } from './ui/buttons/save-button/save-button.component';
import { EditButtonComponent } from './ui/buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from './ui/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './ui/buttons/add-button/add-button.component';
import { ResetButtonComponent } from './ui/buttons/reset-button/reset-button.component';
import { FilterButtonComponent } from './ui/buttons/filter-button/filter-button.component';
import { GridComponent } from './ui/grid/grid.component';
import { DownloadDataComponent } from './ui/buttons/download-server-data/download-data.component';
import { ImageChooserComponent } from './ui/image-chooser/image-chooser.component';


@NgModule({
   imports: [
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
   ],
   declarations: [
      ComboBoxComponent,
      SaveButtonComponent,
      EditButtonComponent,
      DeleteButtonComponent,
      DownloadDataComponent,
      AddButtonComponent,
      ResetButtonComponent,
      FilterButtonComponent,
      GridComponent,
      ImageChooserComponent
   ],
   exports: [
      ComboBoxComponent,
      SaveButtonComponent,
      EditButtonComponent,
      DeleteButtonComponent,
      DownloadDataComponent,
      AddButtonComponent,
      ResetButtonComponent,
      FilterButtonComponent,
      GridComponent,
      ImageChooserComponent
   ]
})
export class CommonAppModule { }
