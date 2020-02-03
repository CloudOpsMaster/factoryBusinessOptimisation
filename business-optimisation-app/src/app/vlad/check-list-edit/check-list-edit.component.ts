import { Component, OnInit } from '@angular/core';
import { StorageKey } from 'src/app/services/storage.service';
import { ICheckListModel } from 'src/app/models/CheckList/CheckListModel';
import { CheckListBase } from '../check-list-base';
import { CheckListArray } from 'src/app/models/CheckList/CheckListArray';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list-edit.component.html',
  styleUrls: [
    './check-list-edit.component.scss',
    '../check-list.component.scss'
  ]
})

export class CheckListEditComponent extends CheckListBase implements OnInit {

  ngOnInit() {

  }

  public listCreate() {
    this.checkList.listCreate();
    this.scrollToDown('.left-box');
    this.dataSave();
  }

  public listRename() {
    const newName = prompt('Введите новое название:', this.checkList.current.list.name);

    try {
      this.checkList.listRename(newName);
      this.dataSave();
    }
    catch (e) {
      alert(e);
      this.listRename();
    }
  }

  public listDelete(listIndex: number) {
    const result = confirm(`Удалить "${this.checkList.array[listIndex].name}"?`);

    if (result === true) {
      this.checkList.listDelete(listIndex);
      this.dataSave();
    }
  }

  public taskCreate() {
    this.checkList.taskCreate();
    this.scrollToDown('.right-box');
    this.dataSave();
  }

  public taskDelete(taskIndex: number) {
    this.checkList.taskDelete(taskIndex);
    this.dataSave();
  }

  public dataRequest() {
    const request = this.storage.getTypedData<ICheckListModel>(StorageKey.CheckList);
    // this.storage.deleteData(StorageKey.CheckList)

    if (request !== null) {
      this.checkList = new CheckListArray(request.list);

      if (request.lastSeen < this.checkList.length) {
        this.checkList.listSelect(request.lastSeen)
      }
    }
    else {
      this.listCreate();
    }
  }

  public listServer() {
    this.listCreate();
    this.checkList.taskCreate('Чек-лист загружен успешно с сервера', true);
    this.checkList.taskDelete(0);
    this.taskCreate();
  }

  private scrollToDown(className: string) {
    const element = document.querySelector(className);

    if (element !== null) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
}