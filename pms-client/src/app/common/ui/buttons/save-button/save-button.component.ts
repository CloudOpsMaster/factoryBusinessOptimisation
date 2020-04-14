import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrls: [
    '../base-button.component.scss',
    '../../style.scss']
})
export class SaveButtonComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
