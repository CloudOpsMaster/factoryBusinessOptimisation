import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: [
    './add-button.component.scss',
    '../base-button.component.scss']
})
export class AddButtonComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
