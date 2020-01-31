import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  locationForm: FormGroup;
  canDisplayForm: boolean;

  @Output() reset = new EventEmitter<boolean>();
  @Output() renovation = new EventEmitter<ILocationAddress>();
  @Output() deletion = new EventEmitter<ILocationAddress>();

  @Input() set openForm(value: boolean) { this.canDisplayForm = value; }
  @Input() set row(value: ILocationAddress) {
    if (value != null) {
      this.locationForm.get('id').setValue(value.id);
      this.locationForm.get('name').setValue(value.name);
    }
  }

  constructor() {
    this.createForm();
  }

  ngOnInit() { }

  private createForm(): void {
    this.locationForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  }

  private getLocation(): any {
    const address = <ILocationAddress>{
      id: this.locationForm.get('id').value,
      name: this.locationForm.get('name').value
    };
    return address;
  }

  private onChange(): void {
    this.renovation.emit(this.getLocation());
    this.onReset();
  }

  private onDelete(): void {
    this.deletion.emit(this.getLocation());
    this.onReset();
  }

  private onReset(): void {
    this.locationForm.reset();
    this.reset.emit(true);
  }
}