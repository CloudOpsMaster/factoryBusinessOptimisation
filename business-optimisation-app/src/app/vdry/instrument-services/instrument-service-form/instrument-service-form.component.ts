import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage/storage.service';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { InstrumentFormService } from '../instrument-form.service';

@Component({
  selector: 'app-instrument-service-form',
  templateUrl: './instrument-service-form.component.html',
  styleUrls: ['./instrument-service-form.component.css']
})
export class InstrumentServiceFormComponent implements OnInit {

// ##############################

  public servicesForm: FormGroup;
  public instruments: InstrumentServis[] = [];

  // ##############################

  constructor(private storage: StorageService,
              private instrumentService: InstrumentFormService) { }


  // ##############################

  ngOnInit() {
    this.servicesForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl('')
    });
  }

  onAdd() {
    const newItem = new InstrumentServis(
      this.servicesForm.get('id').value,
      this.servicesForm.get('startDate').value,
      this.servicesForm.get('endDate').value,
      this.servicesForm.get('status').value,
      this.servicesForm.get('description').value
      );
    this.instrumentService.add(newItem);

    if (this.storage.has('_services')) {
          this.storage.delete('_services');
        }

    this.storage.set('_services', this.instruments);
    }
  }

