import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: [
    '../base-button.component.scss',
    '../../style.scss'
  ]
})
export class ResetButtonComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
