import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstrumentService } from '../../instrument.service';
import { StorageService } from 'src/app/services/storage.service';
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

  @Output() itemId: EventEmitter<number> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() updateItem: EventEmitter<number> = new EventEmitter()

  public updade = false;
  public servicesForm: FormGroup;

  constructor( private instrumentService: InstrumentService,
               private storage: StorageService) { }

  ngOnInit() {
  }

  onDelete() {
    this.deleteItem.emit(this.instrument.id);
  }

  onUpdate() {
    this.updateItem.emit(this.instrument.id);
  }

  

}
