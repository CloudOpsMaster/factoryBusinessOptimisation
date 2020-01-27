import { Component, OnInit, Input } from '@angular/core';
import { ILocationAddress } from 'src/app/models/plot/location-address';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  form: boolean;
  item: ILocationAddress;
  @Input() set openForm(value: boolean) { this.form = value; }
  @Input() set row(value: ILocationAddress) {
    this.item = value;
  }
}
