import { Component, OnInit, HostBinding } from '@angular/core';
import { AbstractButton } from '../abstract-button';

@Component({
  selector: 'download-data-button',
  templateUrl: './download-data.component.html',
  styleUrls: [
    '../base-button.component.scss',
    '../../style.scss'
  ]
})

export class DownloadDataComponent extends AbstractButton implements OnInit {

  @HostBinding('class.eventsDisabled') disabled;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
