import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageKey = 'factoryData';

  getData(key: string): any[] {
    const data = this.getStorage();
    return data[key];
  }

  setData(key: string, dataToSave: any) {
    const storage = this.getStorage();
    const data = storage[key] || [];
    data.push(dataToSave);
    storage[key] = data;
    this.saveStorage(storage);
  }

  deleteData(key: string) {
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
