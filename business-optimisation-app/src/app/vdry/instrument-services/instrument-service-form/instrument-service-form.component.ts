import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage/storage.service';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { InstrumentService } from '../instrument.service';

@Component({
  selector: 'app-instrument-service-form',
  templateUrl: './instrument-service-form.component.html',
  styleUrls: ['./instrument-service-form.component.css']
})
export class InstrumentServiceFormComponent implements OnInit {

  @Input() set itemId(id: number) {
    if (id) {
     const item = this.instrumentService.getById(id);
     this.servicesForm.get('startDate').setValue(item.startDate),
     this.servicesForm.get('endDate').setValue(item.endDate),
      this.servicesForm.get('status').setValue(item.status),
      this.servicesForm.get('description').setValue(item.description);
    }
    this.updateItemId = id;

  }

  @Output() private setItem: EventEmitter<InstrumentServis> = new EventEmitter();
  @Output() private updateItem: EventEmitter<InstrumentServis> = new EventEmitter()


// ##############################

  public servicesForm: FormGroup;

  private updateItemId;
  // ##############################

  constructor(private storage: StorageService,
              private instrumentService: InstrumentService) { }


  // ##############################

  ngOnInit() {
    this.servicesForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl('')
    });
  }

  onAdd() {
    const newItem = new InstrumentServis(
      this.servicesForm.get('startDate').value,
      this.servicesForm.get('endDate').value,
      this.servicesForm.get('status').value,
      this.servicesForm.get('description').value
      );

    this.setItem.emit(newItem);
    }

    onSave() {
      const newSaveItem = new InstrumentServis(
        this.servicesForm.get('startDate').value,
        this.servicesForm.get('endDate').value,
        this.servicesForm.get('status').value,
        this.servicesForm.get('description').value,
        this.updateItemId
        );

        this.updateItem.emit(newSaveItem);
    }
  }

