import { Component } from '@angular/core';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent {

  public canShowWorkAreaForm: boolean = false;

  constructor() { }

  public showWorkAreaForm(): void {
    this.canShowWorkAreaForm = (!this.canShowWorkAreaForm) ? true : false;
  }
}
