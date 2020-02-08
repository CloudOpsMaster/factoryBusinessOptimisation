import { Component, OnInit } from '@angular/core';
import { CheckListBase } from '../check-list-base';

@Component({
  selector: 'app-check-list-view',
  templateUrl: './check-list-view.component.html',
  styleUrls: [
    './check-list-view.component.scss',
    '../check-list-base.scss'
  ]
})
export class CheckListViewComponent extends CheckListBase implements OnInit {

  ngOnInit() {
  }
}
