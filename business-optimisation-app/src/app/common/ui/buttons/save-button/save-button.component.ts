import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: [
    './save-button.component.scss',
    '../base-button.component.scss']
})
export class SaveButtonComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
