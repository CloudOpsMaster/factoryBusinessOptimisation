import { Injectable } from '@angular/core';
import { InstrumentServis } from '../models/instrumentServis/InstrumentServis';
import { InstrumentService } from '../vdry/instrument-services/instrument.service';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage = window.localStorage;

  // ########################################

  public get<T>(key: string): T[] {
      const items: T[] = JSON.parse(this.storage.getItem(key));

      if (!items) {
          throw new Error(`Data for key - ${key} is undefined`);
      }

      return items;
  }

  public getById<T>(key: string, id: number): T {
      const items: T[] = this.get(key);

      const findElem = items.find((item: any) => {
          return item.id === id;
      });

      if (findElem) {
          return findElem;
      }

      throw new Error(`Incorrect id - ${id}`);
  }

  public set<T>(key: string, item: any): void {
      const randomId = Math.random();
      const newItem = { ...item, id: randomId };
      const items: T[] = JSON.parse(this.storage.getItem(key));

      if (!items) {
          this.storage.setItem(key, JSON.stringify([newItem]));

          return;
      }

      const fiendElem = items.find((elem: any) => {
          return elem.id === newItem.id;
      });

      if (fiendElem) {
          throw new Error(`Element is already exist!`);
      }

      items.push(newItem);

      this.storage.setItem(key, JSON.stringify(items));
  }

  public has(key: string, id: number): boolean {
      const items: InstrumentServis[] = JSON.parse(this.storage.getItem(key));

      const findElem = items.find((item: InstrumentServis) => {
          return item.id === id;
      });

      if (findElem) {
          return true;
      }

      return false;
  }

  public hasKey(key: string): boolean {
    if (this.storage.getItem(key)) {
        return true;
    }

    return false;
  }

  public delete(key: string, id: number) {
      const items: InstrumentServis[] = JSON.parse(this.storage.getItem(key));

      const filteredArray = items.filter((item: InstrumentServis) => {
          return item.id !== id;
      });
      
      this.storage.setItem(key, JSON.stringify(filteredArray));
  }

  public update<T>(key: string, item: any) {
    const items: InstrumentServis[] = JSON.parse(this.storage.getItem(key));
    const index = items.findIndex((element: any) => {
      return element.id === item.id;
    })

    items.splice(index, 1, item);

    this.storage.setItem(key, JSON.stringify(items))
  }

  // ########################################
}
