import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public canShowLocationForm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public showLocationForm(): void {
    this.canShowLocationForm = (!this.canShowLocationForm) ? true : false;
  }
}