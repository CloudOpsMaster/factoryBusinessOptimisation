import { Component, OnInit } from '@angular/core';
import { ICheckListModel, ICheckList, ListType, ListTypeInfo } from 'src/app/models/CheckList/CheckListModel';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { CheckListBase } from '../check-list-base';

@Component({
  selector: 'app-check-list-view',
  templateUrl: './check-list-view.component.html',
  styleUrls: [
    './check-list-view.component.scss',
    '../check-list.component.scss'
  ]
})
export class CheckListViewComponent extends CheckListBase implements OnInit {

  ngOnInit() {
  }
}
