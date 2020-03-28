import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-place',
  templateUrl: './work-place.component.html',
  styleUrls: ['./work-place.component.scss']
})
export class WorkPlaceComponent {

  public canShowWorkPlaceForm: boolean = false;
  
  constructor() { }

  public showWorkPlaceForm(): void {
    this.canShowWorkPlaceForm = (!this.canShowWorkPlaceForm) ? true : false;
  }
}
