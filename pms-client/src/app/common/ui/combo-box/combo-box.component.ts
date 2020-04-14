import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { DisplayValueItem, DisplayValueItemsCreator } from '../../model/display-value-item';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
   selector: 'app-combo-box',
   templateUrl: './combo-box.component.html',
   styleUrls: ['./combo-box.component.css'],
   providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
   }]
})
export class ComboBoxComponent implements OnInit, OnChanges, ControlValueAccessor {

   @Input() dataSource: Array<any>;
   @Input() displayMember = 'displayMember';
   @Input() valueMember = 'valueMember';
   @Input() disabled = false;

   public comboBoxItems = new Array<DisplayValueItem>();

   private myComboBoxModel: any;
   // Whatever name for this (myValue) you choose here, use it in the .html file.
   public get comboBoxModel(): any { return this.myComboBoxModel; }
   public set comboBoxModel(v: any) {
      if (v !== this.myComboBoxModel) {
         this.myComboBoxModel = v;
         this.onChange(v);
      }
   }

   constructor() { }

   // region implements ControlValueAccessor interface - begin
   onChange = (_) => { };
   onTouched = () => { };

   writeValue(value: any): void {
      this.comboBoxModel = value;
   }
   registerOnChange(fn: any): void {
      this.onChange = fn;
   }
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
   setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }
   // region implements ControlValueAccessor interface - end

   ngOnInit() {
      this.createComboBoxItems();
   }

   ngOnChanges(changes: SimpleChanges) {
      this.createComboBoxItems();
   }

   private createComboBoxItems() {
      this.comboBoxItems = DisplayValueItemsCreator.CreateFrom(this.dataSource, this.displayMember, this.valueMember);
   }

}
