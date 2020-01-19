import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DayOffForm } from '../day-off.model';
import { DayOffFormsService } from '../services/day-off-forms.service';

@Component({
  selector: 'app-day-off-list',
  templateUrl: './day-off-list.component.html',
  styleUrls: ['./day-off-list.component.scss']
})
export class DayOffListComponent implements OnInit{

  //public dayOffForms: DayOffForm[] = [];
  @Input() public dayOffForms: DayOffForm;
  @Output() removeData = new EventEmitter();


  constructor(
    private dayOffFormsService: DayOffFormsService
  ) {}

  ngOnInit(): void {
    //this.dayOffForms = this.dayOffFormsService.initDayOffForms();
  }

  public remove() {
    this.dayOffFormsService.remove(this.dayOffForms.id);
    this.removeData.emit();
  }


}
