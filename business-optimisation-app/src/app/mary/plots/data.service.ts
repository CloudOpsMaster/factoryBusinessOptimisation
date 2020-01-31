import { Injectable, EventEmitter } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataForLocation:EventEmitter<number> = new EventEmitter();
  
  constructor(private storage: StorageService) { }

  setLocations():void {
    const data = this.storage.getData(StorageKey.LocationAddresses);
    this.dataForLocation.emit(data);
  }
}
