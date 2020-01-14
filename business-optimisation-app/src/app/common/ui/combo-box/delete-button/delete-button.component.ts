import { Component, OnInit } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent extends AbstractButton implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
