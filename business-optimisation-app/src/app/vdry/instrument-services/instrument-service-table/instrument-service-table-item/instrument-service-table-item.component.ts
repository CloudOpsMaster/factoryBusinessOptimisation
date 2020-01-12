import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstrumentService } from '../../instrument.service';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-instrument-service-table-item',
  templateUrl: './instrument-service-table-item.component.html',
  styleUrls: ['./instrument-service-table-item.component.css']
})
export class InstrumentServiceTableItemComponent implements OnInit {

  @Input() instrument: InstrumentServis;
  @Input() indexItem: number;

  @Output() itemId: EventEmitter<number> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() updateItem: EventEmitter<number> = new EventEmitter();
  @Output() private saveItem: EventEmitter<InstrumentServis> = new EventEmitter();

  public updade = false;
  public servicesEditForm: FormGroup;
  public instruments: InstrumentServis[] = [];
  public readonly = true;

  private updateItemId;


  constructor( private instrumentService: InstrumentService) { }

  ngOnInit() {

    if (this.instrumentService.hasKey()) {
      this.instruments = this.instrumentService.getData();
    }

    this.initForm();
  }

  initForm() {
    const item = this.instrumentService.getById(this.instrument.id);

    this.servicesEditForm = new FormGroup({
      startDate: new FormControl(item.startDate, [Validators.required]),
      endDate: new FormControl(item.endDate, [Validators.required]),
      status: new FormControl(item.status, [Validators.required]),
      description: new FormControl(item.description)
    });
  }

  onDelete() {
    this.deleteItem.emit(this.instrument.id);
  }

  onUpdate() {
    this.updateItem.emit(this.instrument.id);
    this.instrumentService.disabledFlag(true);
    this.readonly = false;
  }

  onSave() {
    const newItem = new InstrumentServis(
      this.servicesEditForm.get('startDate').value,
      this.servicesEditForm.get('endDate').value,
      this.servicesEditForm.get('status').value,
      this.servicesEditForm.get('description').value,
      this.updateItemId = this.instrument.id
    );

    this.saveItem.emit(newItem);
    this.readonly = true;
  }
}
