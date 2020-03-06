import { Component, OnInit } from '@angular/core';
import { DayOffForm } from './day-off.model';
import { DayOffFormsService } from './services/day-off-forms.service';


@Component({
  selector: 'app-day-off-form',
  templateUrl: './day-off-form.component.html',
  styleUrls: ['./day-off-form.component.scss']
})
export class DayOffFormComponent implements OnInit {
  public dayOffForms: DayOffForm[] = [];

  constructor(
    private dayOffFormsService: DayOffFormsService
  ) { }

  ngOnInit() {
    this.update();
  }

  public update(): void {
    this.dayOffForms = this.dayOffFormsService.update();
  }

}
