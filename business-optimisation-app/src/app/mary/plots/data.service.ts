import { Injectable, EventEmitter } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { IWorkSite } from 'src/app/models/plot/work-site';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataForLocation: EventEmitter<Array<ILocationAddress>> = new EventEmitter();
  dataForOffice: EventEmitter<Array<IWorkSite>> = new EventEmitter();
  dataForGuild: EventEmitter<Array<IWorkSite>> = new EventEmitter();

  constructor(private storage: StorageService) { }

  setLocations(): void {
    const data = this.storage.getData(StorageKey.LocationAddresses);
    this.dataForLocation.emit(data);
  }

  setWorkSiteForOffice() :void {
    const data = this.storage.getData(StorageKey.WorkSiteForOffice);
    this.dataForOffice.emit(data);
  }

  setWorkSiteForGuild() :void {
    const data = this.storage.getData(StorageKey.WorkSiteForGuild);
    this.dataForGuild.emit(data);
  }
}
