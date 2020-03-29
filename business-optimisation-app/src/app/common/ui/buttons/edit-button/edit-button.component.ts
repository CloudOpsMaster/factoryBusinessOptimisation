import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: [
    '../base-button.component.scss',
    '../../style.scss'
  ]
})
export class EditButtonComponent extends AbstractButton implements OnInit {

  @Input() showCancelBtn = false;

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
