import { Injectable } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class InstrumentFormService {
  servicesForm: any;
  instruments: InstrumentServis[] = [];
  instrument: InstrumentServis;

  add(instrumentServis: InstrumentServis) {
      this.instruments.push(
        instrumentServis
        );
  }

  delete(index: number) {
    this.instruments.splice(index, 1);
  }

  // update(element: InstrumentServis) {

  // }


  getOllInstruments() {
    return this.instruments;
  }

}
