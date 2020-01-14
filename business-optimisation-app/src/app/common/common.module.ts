import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from './ui/combo-box/combo-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveButtonComponent } from './ui/combo-box/save-button/save-button.component';
import { EditButtonComponent } from './ui/combo-box/edit-button/edit-button.component';
import { DeleteButtonComponent } from './ui/combo-box/delete-button/delete-button.component';


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
      DeleteButtonComponent
   ],
   exports: [
      ComboBoxComponent,
      SaveButtonComponent,
      EditButtonComponent,
      DeleteButtonComponent
   ]
})
export class CommonAppModule { }
