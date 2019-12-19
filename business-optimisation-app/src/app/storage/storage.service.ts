import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = window.localStorage;

  // ########################################

  public has(key: string): boolean {
    if (this.storage.getItem(key)) {
      return true;
    }

    return false;
  }

  public get(key: string): any {
    if (this.has(key)) {
      return JSON.parse(this.storage.getItem(key));
    }

    throw new Error(`key - ${key} is not valid!`);
  }

  public set(key: string, value: any): void {
    // if (this.has(key)) {
    //   throw new Error(`Key - ${key} is already exist!`);
    // }

    this.storage.setItem(key, JSON.stringify(value));
  }

  public delete(key: string): void {
    if (this.has(key)) {
      this.storage.removeItem(key);

      return;
    }

    throw new Error(`Key - ${key} is not valid!`);
  }

  // ########################################
}
