import { Component, OnInit } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-instrument-services',
  templateUrl: './instrument-services.component.html',
  styleUrls: ['./instrument-services.component.scss']
})
export class InstrumentServicesComponent implements OnInit {

  public servicesForm: FormGroup;

  public instruments: InstrumentServis[] = [];

  public updade = false;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    // this.servicesForm = new FormGroup({
    //   id: new FormControl(null, [Validators.required]),
    //   startDate: new FormControl(''),
    //   endDate: new FormControl(''),
    //   status: new FormControl(''),
    //   description: new FormControl('')
    // });
  }

  // ##############################

  // onAdd() {
  //   if (this.servicesForm.valid) {
  //     const newItem = new InstrumentServis(
  //       this.servicesForm.get('id').value,
  //       this.servicesForm.get('startDate').value,
  //       this.servicesForm.get('endDate').value,
  //       this.servicesForm.get('status').value,
  //       this.servicesForm.get('description').value
  //       );

  //     this.instruments.push(
  //         newItem
  //       );

  //     if (this.storage.has('_services')) {
  //         this.storage.delete('_services');
  //       }

  //     this.storage.set('_services', this.instruments);
  //   }
  // }

  // ##############################

  // onDelete(index: number) {

  //       this.instruments.splice(index, 1);

  //       if (this.storage.has('_services')) {
  //     this.storage.delete('_services');
  //   }

  //       this.storage.set('_services', this.instruments);
  // }

  // ##############################

  // onUppdate(element: InstrumentServis): void {
  //   this.updade = true;

  //   this.servicesForm.get('description').setValue(element.description);
  //   this.servicesForm.get('startDate').setValue(element.startDate);
  //   this.servicesForm.get('endDate').setValue(element.endDate);
  //   this.servicesForm.get('status').setValue(element.status);
  //   this.servicesForm.get('id').setValue(element.id);
  // }

  public onSave(index: number) {
    const newInstrument: InstrumentServis = {
      startDate: this.servicesForm.get('startDate').value,
      endDate: this.servicesForm.get('endDate').value,
      status: this.servicesForm.get('status').value,
      description: this.servicesForm.get('description').value,
      id: this.servicesForm.get('id').value
    };

    this.instruments.splice(index, 1, newInstrument);
  }
}
