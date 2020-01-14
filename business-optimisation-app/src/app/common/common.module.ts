import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from './ui/combo-box/combo-box.component';
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
      ComboBoxComponent
   ],
   exports: [
      ComboBoxComponent
   ]
})
export class CommonAppModule { }
