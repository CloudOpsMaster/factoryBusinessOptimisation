import { Injectable } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { StorageService, StorageKey } from 'src/app/services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  public static readonly STORAGE_KEY = StorageKey.InstrumentsStorageKey;
  public static readonly STORAGE_KEY_HISTORY = StorageKey.InstrumentsStorageKeyHistory;
  public disabled: boolean;

  constructor(private storageService: StorageService) {}

  public getData(): InstrumentServis[] {
    const items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY);

    if (!items) {
        throw new Error(`Data for key - ${InstrumentService.STORAGE_KEY} is undefined`);
    }

    return items;
  }

  public getDataHistory(): InstrumentServis[] {
    const items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY_HISTORY);

    if (!items) {
        throw new Error(`Data for key - ${InstrumentService.STORAGE_KEY_HISTORY} is undefined`);
    }

    return items;
  }



  public hasKey(): boolean {
    return this.storageService.hasKey(InstrumentService.STORAGE_KEY);
  }

  public getById(id: number): InstrumentServis {

    const items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY);

    const findElem = items.find((item: any) => {
        return item.id === id;
    });

    if (findElem) {
      return findElem;
    }
    throw new Error(`Incorrect id - ${id}`);
  }


  public set(element: InstrumentServis): void {
    const randomId = Math.floor(Math.random() * 1000000 );
    const newItem: InstrumentServis = { ...element, id: randomId};
    let items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY);

    if (this.storageService.hasKey(InstrumentService.STORAGE_KEY)) {
      items.push(newItem);
    } else {
      items = [newItem];
    }

    this.storageService.deleteData(InstrumentService.STORAGE_KEY);
    this.storageService.setData(InstrumentService.STORAGE_KEY, items);
  }

  public setHistory(element: InstrumentServis): void {
    const newItem: InstrumentServis = { ...element};
    let items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY_HISTORY);

    if (this.storageService.hasKey(InstrumentService.STORAGE_KEY_HISTORY)) {
      items.push(newItem);
    } else {
      items = [newItem];
    }

    this.storageService.deleteData(InstrumentService.STORAGE_KEY_HISTORY);
    this.storageService.setData(InstrumentService.STORAGE_KEY_HISTORY, items);
  }





  public delete(id: number): void {
    const items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY);

    const filteredArray = items.filter((item: InstrumentServis) => {
        return item.id !== id;
    });

    this.storageService.setData(InstrumentService.STORAGE_KEY, filteredArray);
  }

  public update(item: InstrumentServis): void {
    const items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY);

    const index = items.findIndex((element: InstrumentServis) => {
      return element.id === item.id;
    });

    items.splice(index, 1, item);

    this.storageService.setData(InstrumentService.STORAGE_KEY, items);
  }

// ========== History =======

  public history(item: InstrumentServis): void {
    let items: InstrumentServis[] = this.storageService.getData(InstrumentService.STORAGE_KEY_HISTORY);
    const newItem: InstrumentServis = { ...item, id: item.id};

    if (this.storageService.hasKey(InstrumentService.STORAGE_KEY_HISTORY)) {
      items.push(newItem);
    } else {
      items = [newItem];
    }

    this.storageService.setData(InstrumentService.STORAGE_KEY_HISTORY, items);
  }


  // ========== History =======

  public clear(): void {
    this.storageService.deleteData(InstrumentService.STORAGE_KEY);
  }

  public disabledFlag(val: boolean): void {
    this.disabled = val;
  }

  public getDisabledFlag(): boolean {
    return this.disabled;
  }

}
