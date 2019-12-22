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

  public get<T>(key: string): T[] | null {
    if (this.storage.getItem(key)) {
      return <T[]>JSON.parse(this.storage.getItem(key));
    }
    
    return null;
  }

  public set(key: string, value: any): void {
      this.storage.setItem(key, JSON.stringify(value));
  }

  public has(key: string): boolean {
      if (this.storage.getItem(key)) {
        return true;
      }

      return false;
  }

  public delete(key: string) {
      this.storage.removeItem(key);
  }

  public update<T>(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  // ########################################
}
