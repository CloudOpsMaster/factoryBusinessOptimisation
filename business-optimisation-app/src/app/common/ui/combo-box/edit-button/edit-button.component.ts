import { Component, OnInit, Input } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent extends AbstractButton implements OnInit {

  @Input() showCancelBtn = false;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
