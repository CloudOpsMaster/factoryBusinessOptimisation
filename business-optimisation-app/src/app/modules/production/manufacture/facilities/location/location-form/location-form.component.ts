import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Address } from 'src/app/models/common/address';
import { Location } from "../../../../../../models/facilities-management/location";
import { LocationService } from '../location.service';
import { AddressService } from '../addesss.service';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})

export class LocationFormComponent {
  private location: Location = null;

  public canShowLocationFormForChange: boolean;
  public locationForm: FormGroup;
  public applyTranslate: string;
  public cancelTranslate: string;
  public deleteTranslate: string;

  @Input() canShowLocationForm: boolean;

  constructor(private locationServise: LocationService, private addressService: AddressService, public translation: TranslationService) {
    this.createForm();
    this.translation.translationChanged().subscribe(
      () => {
        this.applyTranslate = this.translation.translate('apply');
        this.cancelTranslate = this.translation.translate('cancel');
        this.deleteTranslate = this.translation.translate('delete');
      }
    );
    this.locationServise.variableLocation.subscribe((location: Location) => {
      if (location && location.id > -1) {
        this.canShowLocationFormForChange = true;
        this.canShowLocationForm = true;
        this.location = location;
        this.setLocation(location);
      }
    })
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

  private getAddress(): Address {
    const address = new Address();
    address.city = this.locationForm.get('city').value;
    address.street = this.locationForm.get('street').value;
    address.buildingNumber = this.locationForm.get('buildingNumber').value;
    address.floors = this.locationForm.get('floors').value;
    return address;
  }

  private getLocation(): Location {
    const location = new Location();
    location.comment = this.locationForm.get('comment').value;
    return location;
  }

  private clearForm(): void {
    this.locationForm.reset();
  }

  public onSave(): void {
    this.addressService.addAddress(this.getAddress());
    this.locationServise.add(this.getLocation());
    this.clearForm();
  }

  public onChange(): void {
    this.addressService.addAddress(this.getAddress());
    this.locationServise.change(this.getLocation(), this.location);
    this.clearForm();
    this.setViewForm();
  }

  private setViewForm(): void {
    this.canShowLocationFormForChange = false;
    this.canShowLocationForm = false;
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.locationServise.remove(this.location);
    this.clearForm();
    this.setViewForm();
  }

  private setLocation(location: Location): void {
    this.locationForm.get('city').setValue(location.address.city);
    this.locationForm.get('street').setValue(location.address.street);
    this.locationForm.get('buildingNumber').setValue(location.address.buildingNumber);
    this.locationForm.get('floors').setValue(location.address.floors);
    this.locationForm.get('comment').setValue(location.comment);
  }
}