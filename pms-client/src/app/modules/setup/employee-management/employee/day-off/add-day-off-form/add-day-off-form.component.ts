import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DayOffForm } from '../day-off.model';
import { DayOffFormsService } from '../services/day-off-forms.service';

@Component({
  selector: 'app-add-day-off-form',
  templateUrl: './add-day-off-form.component.html',
  styleUrls: ['./add-day-off-form.component.scss']
})
export class AddDayOffFormComponent implements OnInit {

  @Output() public addDayOff: EventEmitter<DayOffForm> = new EventEmitter<DayOffForm>();

  public isShowForm: boolean = false;
  public addDayOffForm: FormGroup;

  public showForm(): void {
    this.isShowForm = true;
  }

  constructor(
    private dayOffFormsService: DayOffFormsService
  ) {}

  ngOnInit() {
    this.addDayOffForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      surname: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  public onSubmit(): void {
    const name = this.addDayOffForm.value.name;
    const surname = this.addDayOffForm.value.surname;
    const dayOffForm = new DayOffForm(name, surname);
    this.dayOffFormsService.addDayOff(dayOffForm);
    this.addDayOffForm.reset();
    this.isShowForm = false;

    //console.log(dayOffForm);
  }


}
