import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';

@Component({
  selector: 'app-instrument-service-table',
  templateUrl: './instrument-service-table.component.html',
  styleUrls: ['./instrument-service-table.component.css']
})
export class InstrumentServiceTableComponent implements OnInit {

  @Output() itemId: EventEmitter<number> = new EventEmitter();

  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() updateItem: EventEmitter<number> = new EventEmitter();

  @Input() public instrumentList: InstrumentServis[] = [];

  constructor() { }

  ngOnInit() {}

  redirectId(id: number) {
    this.itemId.emit(id);
  }

  public onDelete(id: number): void {
    this.deleteItem.emit(id);
  }

  public onUpdate(id: number): void {
    this.updateItem.emit(id);
  }
}


