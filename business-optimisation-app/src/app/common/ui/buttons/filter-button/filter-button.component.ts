import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: [
    './filter-button.component.scss',
    '../base-button.component.scss']
})
export class FilterButtonComponent extends AbstractButton {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

}
