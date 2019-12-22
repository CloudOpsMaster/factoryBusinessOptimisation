import { Injectable } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { StorageService } from 'src/app/storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  public static readonly STORAGE_KEY = '_services';

  constructor(private storageService: StorageService) {}

  public get(): InstrumentServis[] {
    const items: InstrumentServis[] = this.storageService.get(InstrumentService.STORAGE_KEY);

      if (!items) {
          throw new Error(`Data for key - ${InstrumentService.STORAGE_KEY} is undefined`);
      }

      return items;
  }

  public has(): boolean {
    return this.storageService.has(InstrumentService.STORAGE_KEY);
  }

  public getById(id: number): InstrumentServis {

    const items: InstrumentServis[] = this.storageService.get(InstrumentService.STORAGE_KEY);

      const findElem = items.find((item: any) => {
          return item.id === id;
      });

      if (findElem) {
          return findElem;
      }

      throw new Error(`Incorrect id - ${id}`);
  }

  public set(element: InstrumentServis): void {
    const randomId = Math.random();
    const newItem: InstrumentServis = { ...element, id: randomId };
    let items: InstrumentServis[] = this.storageService.get(InstrumentService.STORAGE_KEY);

    if (this.storageService.has(InstrumentService.STORAGE_KEY)) {
      items.push(newItem);
    } else {
      items = [newItem];
    }
    
    this.storageService.delete(InstrumentService.STORAGE_KEY);
    this.storageService.set(InstrumentService.STORAGE_KEY, items);
  }

  public delete(id: number): void {
    const items: InstrumentServis[] = this.storageService.get(InstrumentService.STORAGE_KEY);

    const filteredArray = items.filter((item: InstrumentServis) => {
        return item.id !== id;
    });

    this.storageService.set(InstrumentService.STORAGE_KEY, filteredArray);
  }

  public update(item: InstrumentServis): void {
    const items: InstrumentServis[] = this.storageService.get(InstrumentService.STORAGE_KEY);

    const index = items.findIndex((element: InstrumentServis) => {
      return element.id === item.id;
    })

    items.splice(index, 1, item);

    this.storageService.update(InstrumentService.STORAGE_KEY, items)
  }

  public clear(): void {
    this.storageService.delete(InstrumentService.STORAGE_KEY);
  }

}
