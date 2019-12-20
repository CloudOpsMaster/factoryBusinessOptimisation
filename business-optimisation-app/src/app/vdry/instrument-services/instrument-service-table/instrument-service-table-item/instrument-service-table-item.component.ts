import { Component, OnInit, Input } from '@angular/core';
import { InstrumentFormService } from '../../instrument-form.service';
import { StorageService } from 'src/app/storage/storage.service';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instrument-service-table-item',
  templateUrl: './instrument-service-table-item.component.html',
  styleUrls: ['./instrument-service-table-item.component.css']
})
export class InstrumentServiceTableItemComponent implements OnInit {

  @Input() instrument: InstrumentServis;
  @Input() indexItem: number;

  public updade = false;
  public servicesForm: FormGroup;

  constructor( private instrumentService: InstrumentFormService,
               private storage: StorageService) { }

  ngOnInit() {
  }


  onUppdate() {
    this.updade = true;
    // this.servicesForm.get('description').setValue(element);
    // this.servicesForm.get('startDate').setValue(element);
    // this.servicesForm.get('endDate').setValue(element);
    // this.servicesForm.get('status').setValue(element);
    // this.servicesForm.get('id').setValue(element);

    // this.instrumentService.update(this.instrument);

  }

  onSave() {
    this.updade = false;
  }

  onDelete() {
    this.instrumentService.delete(this.indexItem);

    if (this.storage.has('_services')) {
        this.storage.delete('_services');
    }

    this.storage.set('_services', this.instrument);
  }

}
