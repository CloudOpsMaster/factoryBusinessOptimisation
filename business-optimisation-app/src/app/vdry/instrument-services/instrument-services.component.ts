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
public test = this.instrumentService.getDisabledFlag();
  public instruments: InstrumentServis[] = [];
  public myDisabled;

  constructor(private instrumentService: InstrumentService) { }

  ngOnInit() {
    if (this.instrumentService.hasKey()) {
      this.instruments = this.instrumentService.getData();
    }

  }

  redirectId(id: number) {
    this.itemId = id;
  }

  public onAdd(item: InstrumentServis): void {
    this.instrumentService.set(item);

    this.instruments = this.instrumentService.getData();
  }

  public onDelete(id: number): void {
    this.instrumentService.delete(id);

    this.instruments = this.instrumentService.getData();
  }

  public onUpdate(id: number) {
    this.itemId = id;
  }

  public onSave(item: InstrumentServis) {
    this.itemId = -1;
    this.instrumentService.update(item);

    this.instruments = this.instrumentService.getData();
  }
}
