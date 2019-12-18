import { Component, OnInit, Input } from '@angular/core';
import { InstrumentFormService } from '../instrument-form.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-instrument-service-table',
  templateUrl: './instrument-service-table.component.html',
  styleUrls: ['./instrument-service-table.component.css']
})
export class InstrumentServiceTableComponent implements OnInit {

  // @Input() instruments: any[] = [];

  instruments;

  constructor(private instrumentService: InstrumentFormService,
              private storage: StorageService) { }

  ngOnInit() {
  }

  getInstruments() {
    return this.instrumentService.getOllInstruments();
  }
}
