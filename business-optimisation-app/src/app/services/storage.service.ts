import { Injectable } from '@angular/core';

export enum StorageKeys {
  Materials = 'materials',
  MaterialProviders = 'materialProviders',
  MaterialUnits = 'materialUnits',
  GettingTools = 'gettingTools'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageKey = 'factoryData';

  getData(key: StorageKeys): any[] {
    const data = this.getStorage();
    return data[key];
  }

  setData(key: StorageKeys, dataToSave: any) {
    const storage = this.getStorage();
    const data = storage[key] || [];
    data.push(dataToSave);
    storage[key] = data;
    this.saveStorage(storage);
  }

  deleteData(key: StorageKeys) {
    const storage = this.getStorage();
    delete storage[key];
    this.saveStorage(storage);
  }

  private getStorage(): { [key: string]: any } {
    return JSON.parse(localStorage.getItem(this.storageKey)) || {};
  }

  private saveStorage(data): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
