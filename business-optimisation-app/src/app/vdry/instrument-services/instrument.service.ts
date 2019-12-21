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
    return this.storageService.get(InstrumentService.STORAGE_KEY);
  }

  public getById(id: number): InstrumentServis {
    return this.storageService.getById(InstrumentService.STORAGE_KEY, id);
  }

  public set(element: InstrumentServis): void {
    this.storageService.set(InstrumentService.STORAGE_KEY, element);
  }

  public delete(id: number): void {
    this.storageService.delete(InstrumentService.STORAGE_KEY, id);
  }

  public update(element: InstrumentServis): void {
    this.storageService.update(InstrumentService.STORAGE_KEY, element);
  }

}
