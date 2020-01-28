import { Component, OnInit } from '@angular/core';
import { ICheckListModel, ICheckList, ListType, ListTypeInfo } from 'src/app/models/check-list';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
  selector: 'app-check-list-view',
  templateUrl: './check-list-view.component.html',
  styleUrls: [
    './check-list-view.component.scss',
    '../check-list.component.scss'
  ]
})
export class CheckListViewComponent implements OnInit {

  public listTypes = ListTypeInfo;

  public checkList: ICheckList[] = [];
  public currentList: ICheckList;

  private storage = new StorageService();
  private currentIndex: number;

  constructor() { }

  ngOnInit() {
    this.requestData()
  }

  canCheck(taskIndex: number) {
    const name = this.currentList.list[taskIndex].name;
    const one = this.currentList.type === ListType.Free;
    const two = taskIndex === 0 || this.currentList.list[taskIndex - 1].checked;

    return (one || two)
      && !this.isEmptyOrSpaces(name)
      && !this.currentList.list[taskIndex].checked;
  }

  chooseList(listIndex: number) {
    this.currentList = this.checkList[listIndex];
    this.currentIndex = listIndex;

    this.saveData();
  }

  saveData() {
    let save: ICheckListModel = {
      lastSeen: this.currentIndex,
      list: this.checkList
    }

    this.storage.setData(StorageKey.CheckList, save);
  }

  requestData() {
    const request = this.storage.getTypedData<ICheckListModel>(StorageKey.CheckList);

    // this.storage.deleteData(StorageKey.CheckList)

    if (request !== null) {
      this.checkList = request.list;

      let index = 0;

      if (request.lastSeen < this.checkList.length) {
        index = request.lastSeen
      }

      this.currentList = this.checkList[index];
    }
  }

  private isEmptyOrSpaces(text) {
    return text === null || text.match(/^ *$/) !== null;
  }
}
