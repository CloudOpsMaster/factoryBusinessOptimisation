import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  public canShowLocationForm: boolean = false;

  constructor() { }

  public showLocationForm(): void {
    this.canShowLocationForm = (!this.canShowLocationForm) ? true : false;
  }
}