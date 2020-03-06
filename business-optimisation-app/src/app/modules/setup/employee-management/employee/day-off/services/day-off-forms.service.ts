import { Injectable } from '@angular/core';
import { DayOffForm } from '../day-off.model';

@Injectable({
  providedIn: 'root'
})
export class DayOffFormsService {

  constructor() { }

  private dayOffForms: DayOffForm[] = [];

  public update(): DayOffForm[] {
    this.dayOffForms = JSON.parse(localStorage.getItem('dayOffForms')) || [];
    return this.dayOffForms;
  }

  public addDayOff(dayOffForm: DayOffForm) {
    this.dayOffForms.push(dayOffForm);
    localStorage.setItem('dayOffForms', JSON.stringify(this.dayOffForms));
  }

  public remove(id: string) {
    this.dayOffForms = this.dayOffForms.filter(dayOffForms => dayOffForms.id !==id);
    localStorage.setItem('dayOffForms', JSON.stringify(this.dayOffForms));
  }

}
