import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { ICheckListModel, ICheckList, ListTypeInfo, ListType } from 'src/app/models/check-list';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list-edit.component.html',
  styleUrls: [
    './check-list-edit.component.scss',
    '../check-list.component.scss'
  ]
})

export class CheckListEditComponent implements OnInit {

  public listTypes = ListTypeInfo;
  public selectType: { name: string, type: ListType };

  public checkList: ICheckList[] = [];
  public currentList: ICheckList;

  private storage = new StorageService();
  private currentIndex: number;
  private listNameTemplate = "Новый список"

  constructor() {
    this.selectType = ListTypeInfo[1];
    this.requestData()
  }

  ngOnInit() {

  }

  canCheck(taskIndex: number) {
    const name = this.currentList.list[taskIndex].name;
    const one = this.currentList.type === ListType.Free;
    const two = taskIndex === 0 || this.currentList.list[taskIndex - 1].checked;

    return (one || two)
      && !this.isEmptyOrSpaces(name)
      && !this.currentList.list[taskIndex].checked;
  }

  addList() {
    const newName = `${this.listNameTemplate} ${this.nameIndex()}`;

    const listLength = this.checkList.push({
      name: newName,
      type: this.selectType.type,
      list: [
        {
          name,
          checked: false
        }
      ]
    });

    this.currentList = this.checkList[listLength - 1];
    this.currentIndex = listLength - 1;

    this.scrollToDown('.left-box');
    this.saveData();
  }

  renameList() {
    const newName = prompt('Введите новое название:', this.currentList.name);

    if (newName !== null) {
      if (newName.length && newName.length < 50 && !this.isEmptyOrSpaces(newName)) {
        this.currentList.name = newName;
      }
      else {
        alert('Имя может содержать до 50 символов и не должно быть пустым!');
        this.renameList();
      }
    }

    this.saveData();
  }

  chooseList(listIndex: number) {
    this.currentList = this.checkList[listIndex];
    this.currentIndex = listIndex;

    this.saveData();
  }

  deleteList(listIndex: number) {
    const result = confirm(`Удалить "${this.checkList[listIndex].name}"?`);

    if (result === true) {
      this.checkList.splice(listIndex, 1);

      if (this.checkList.length === 0) this.addList();
      else this.currentList = this.checkList[this.checkList.length - 1];
    }

    this.saveData();
  }

  addItem() {
    this.currentList.list.push({
      name,
      checked: false
    });

    this.scrollToDown('.right-box');
    this.saveData();
  }

  deleteItem(taskIndex: number) {
    this.currentList.list.splice(taskIndex, 1);

    if (this.currentList.list.length === 0) this.addItem();

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
      let index = 0;

      if (request.lastSeen <= this.checkList.length) {
        index = request.lastSeen
      }

      this.checkList = request.list;
      this.currentList = this.checkList[index];
    }
    else {
      this.addList();
      this.saveData();
    }
  }

  serverList() {
    this.addList();
    this.currentList.list[0] = {
      name: 'Чек-лист загружен успешно с сервера',
      checked: true
    };
    this.addItem();
  }

  private scrollToDown(className: string) {
    const element = document.querySelector(className);

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  }

  private isEmptyOrSpaces(text) {
    return text === null || text.match(/^ *$/) !== null;
  }

  private nameIndex(startIndex: number = 0) {
    const name = this.listNameTemplate;

    for (const list of this.checkList) {
      if (list.name.includes(name)) {
        const value = +list.name
          .replace(name, '')
          .trim();

        if (!isNaN(value) && value > startIndex) startIndex = value;
      }
    }

    return startIndex + 1;
  }
}