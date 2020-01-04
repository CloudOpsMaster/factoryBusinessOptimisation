import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKeys } from 'src/app/services/storage.service';
import { GettingTools } from 'src/app/models/getting-tools';

@Component({
  selector: 'app-getting-tools',
  templateUrl: './getting-tools.component.html',
  styleUrls: ['./getting-tools.component.scss']
})
export class GettingToolsComponent implements OnInit {
  ngOnInit() {
    this.items = this.storage.getData(StorageKeys.GettingTools);
  }

  plots: Array<string> = [
    "Швейный",
    "Напиловка"
  ];

  posts: Array<string> = [
    "Сборщик",
    "Паралонщик"
  ];

  notes: Array<string> = [
    "Ремонт",
    "Проверка",
    "Списание"
  ];

  private plot: string;
  private note: string;
  private post: string;

  private items: Array<GettingTools> = new Array<GettingTools>();
  private storage = new StorageService();
  private currentItem: GettingTools;

  private add(): void {
    this.storage.setData(StorageKeys.GettingTools, this.setRow());
    this.items = this.storage.getData(StorageKeys.GettingTools);
  }

  private change(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1, this.setRow());
        break;
      }
    }
    this.rewriteStorage();
  }

  private delete(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
  }

  private setRow(): GettingTools {
    const item = new GettingTools();
    item.name = this.getValue("name");
    item.lastname = this.getValue("lastname");
    item.plot = this.plot;
    item.post = this.post;
    item.tableNumber = this.getValue("table-number");
    item.inventoryNumber = this.getValue("inventory-number");
    item.tool = this.getValue("tool");
    item.count = this.getValue("count");
    item.dateOfIssue = this.getValue("date-of-issue");
    item.dateOfReturn = this.getValue("date-of-return");
    item.note = this.note;
    return item;
  }

  private onRowClick(item: GettingTools): void {
    this.setValue("name", item.name);
    this.setValue("lastname", item.lastname);
    this.plot = item.plot;
    this.post = item.post;
    this.setValue("table-number", item.tableNumber);
    this.setValue("inventory-number", item.inventoryNumber);
    this.setValue("tool", item.tool);
    this.setValue("count", item.count);
    this.setValue("date-of-issue", item.dateOfIssue);
    this.setValue("date-of-return", item.dateOfReturn);
    this.note = item.note;
    this.currentItem = item;
  }

  private getValue(name: string): any {
    const elem: any = document.getElementById(name);
    return elem.value;
  }

  private setValue(nameElem: string, value: any): void {
    const elem: any = document.getElementById(nameElem);
    elem.value = value;
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKeys.GettingTools);
    this.items.forEach(item => {
      this.storage.setData(StorageKeys.GettingTools, item);
    });
  }
}
