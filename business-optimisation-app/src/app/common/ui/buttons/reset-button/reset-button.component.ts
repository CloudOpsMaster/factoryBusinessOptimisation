import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: [
    './reset-button.component.scss',
    '../base-button.component.scss']
})
export class ResetButtonComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
