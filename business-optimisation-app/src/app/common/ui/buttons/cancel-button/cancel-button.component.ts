import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  selector: 'cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: [
    '../base-button.component.scss',
    '../../style.scss'
  ]
})
export class CancelButtonComponent extends AbstractButton implements OnInit{
  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
