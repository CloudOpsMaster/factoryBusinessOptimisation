import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  constructor() { }

  checkLists: ICheckList[] = [];
  currentList: ICheckList;

  ngOnInit() {
    this.newList();
  }

  renameList() {
    const newName = prompt('Введите новое название:', this.currentList.name);

    if (newName != null) {
      if (newName.length && newName.length < 26) {
        this.currentList.name = newName;
      }
      else {
        alert('Имя может содержать до 25 символов!');
        this.renameList();
      }
    }
  }

  chooseList(listIndex: number) {
    this.currentList = this.checkLists[listIndex];
  }

  deleteList() {
    const result = confirm(`Удалить "${this.currentList.name}"?`);

    if (result == true) {
      const index = this.checkLists.indexOf(this.currentList);

      this.checkLists.splice(index, 1);

      if (this.checkLists.length == 0) this.newList();
      else this.currentList = this.checkLists[this.checkLists.length - 1];
    }
  }

  newList() {
    const listLength = this.checkLists.push({
      name: `Список задач ${this.checkLists.length + 1}`,
      list: [
        {
          name,
          checked: false
        }
      ]
    });

    this.currentList = this.checkLists[listLength - 1];
    this.scrollToDown('.left-box');
  }

  deleteItem(taskIndex: number) {
    this.currentList.list.splice(taskIndex, 1);
    if (this.currentList.list.length == 0) this.newItem();
  }

  newItem() {
    this.currentList.list.push({
      name,
      checked: false
    });

    this.scrollToDown('.right-box');
  }

  scrollToDown(className: string) {
    const element = document.querySelector(className);

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  }
}

interface ICheckList {
  name: string;
  list: ICheckListItem[];
}

interface ICheckListItem {
  name: string;
  checked: boolean;
}

