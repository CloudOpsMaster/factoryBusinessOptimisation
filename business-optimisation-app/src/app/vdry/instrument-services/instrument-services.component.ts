import { Component, OnInit } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { InstrumentService } from './instrument.service';

@Component({
  selector: 'app-instrument-services',
  templateUrl: './instrument-services.component.html',
  styleUrls: ['./instrument-services.component.scss']
})
export class InstrumentServicesComponent implements OnInit {

  public itemId;

  public instruments: InstrumentServis[] = [];

  constructor(private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.instruments = this.instrumentService.get();
  }

  redirectId(id: number) {
    this.itemId = id;
  }

  public onAdd(item: InstrumentServis): void {
    this.instrumentService.set(item);

    this.instruments = this.instrumentService.get();
  }

  public onDelete(id: number): void {
    this.instrumentService.delete(id);

    this.instruments = this.instrumentService.get();
  }

  public onUpdate(id: number) {
    this.itemId = id;
  }

  public onSave(item: InstrumentServis) {
    this.instrumentService.update(item);

    this.instruments = this.instrumentService.get();
  }
}
