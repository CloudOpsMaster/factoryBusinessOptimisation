import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/models/common/address';
import { Location } from 'src/app/models/facilities-management/location';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  @Input() canShowLocationForm: boolean;
  public locationForm: FormGroup;
  constructor() {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.locationForm = new FormGroup({
      city: new FormControl(null),
      street: new FormControl(null),
      buildingNumber: new FormControl(null),
      floors: new FormControl(null),
      comment: new FormControl(null)
    })
  }

  private setAddress(): Address {
    const address = new Address();
    address.city = this.locationForm.get('city').value;
    address.street = this.locationForm.get('street').value;
    address.buildingNumber = this.locationForm.get('buildingNumber').value;
    address.floots = this.locationForm.get('floors').value;
    return address;
  }

  private clearForm(): void {
    this.locationForm.reset();
  }

  public onSave(): void {
    this.clearForm();
  }

  public onCancel(): void {
    this.clearForm();
  }
}
