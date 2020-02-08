import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-table-for-location',
  templateUrl: './table-for-location.component.html',
  styleUrls: ['./table-for-location.component.scss']
})
export class TableForLocationComponent implements OnInit {
  private canOpenTable: boolean;
  private isOpenLocationForm: boolean;
  private canUseFuilter: boolean = false;

  private idSearch: number;
  private addressSearch: string = '';

  private currentLocation: ILocationAddress;
  private locations = new Array<ILocationAddress>();
  private changeableLocations = new Array<ILocationAddress>();

  @Input() set isOpenTableForLocation(value: boolean) { this.canOpenTable = value; }

  constructor(private updateDataService: DataService, private storage: StorageService) {
    this.updateDataService.dataForLocation.subscribe(data => {
      this.locations = [];
      this.changeableLocations = [];
      this.locations = data;
      this.changeableLocations = data;
    })
  }

  ngOnInit() {
    this.getLocationsByStorage(StorageKey.LocationAddresses);
  }

  private getLocationsByStorage(storageKey: StorageKey): void {
    this.locations = [];
    this.locations = this.storage.getData(storageKey);
    this.changeableLocations = [];
    this.changeableLocations = this.storage.getData(storageKey);
  }

  private onRowClick(location: ILocationAddress): void {
    this.currentLocation = location;
    this.isOpenLocationForm = true;
  }

  private displayFilters(): void {
    this.canUseFuilter = (this.canUseFuilter === true) ? false : true;
    this.onCancel();
  }

  private onSearch(): void {
    if (this.locations != null) {
      this.updateDataService.setLocations();
      this.changeableLocations = [];
      if (this.idSearch != null) {
        this.changeableLocations = this.searchLocationByIdAndAddress(this.idSearch, this.addressSearch);
      }
      else if (this.idSearch != null) {
        this.changeableLocations = this.searchLocationsById(this.idSearch);
      }
      else if (this.addressSearch != '') {
        this.changeableLocations = this.searchLocatinonByAddress(this.addressSearch);
      }
      else {
        this.changeableLocations = this.locations;
      }
    }
  }

  private searchLocationByIdAndAddress(id: number, value: string): Array<ILocationAddress> {
    const locationsByIdandAddress = new Array<ILocationAddress>();
    this.locations.forEach((address: ILocationAddress) => {
      if (address.id == id && address.name.includes(value)) {
        locationsByIdandAddress.push(address);
      }
    })
    return locationsByIdandAddress;
  }

  private searchLocationsById(id: number): Array<ILocationAddress> {
    const locatinsById = new Array<ILocationAddress>();
    this.locations.forEach((address: ILocationAddress) => {
      if (address.id === id) {
        locatinsById.push(address);
      }
    })
    return locatinsById;
  }

  private searchLocatinonByAddress(value: string): Array<ILocationAddress> {
    const locatinsByAddress = new Array<ILocationAddress>();
    this.locations.forEach((address: ILocationAddress) => {
      if (address.name.includes(value)) {
        locatinsByAddress.push(address);
      }
    })
    return locatinsByAddress;
  }

  private onCancel(): void {
    this.getLocationsByStorage(StorageKey.LocationAddresses);
    this.idSearch = null;
    this.addressSearch = '';
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKey.LocationAddresses);
    this.locations.forEach(item => {
      this.storage.addData(StorageKey.LocationAddresses, item);
    });
  }

  private cancelCurrentLocation(): void {
    this.currentLocation = null;
    this.isOpenLocationForm = false;
  }

  private delete(value: ILocationAddress): void {
    for (let i = 0; i < this.locations.length; i++) {
      if (JSON.stringify(this.locations[i]) === JSON.stringify(value)) {
        this.locations.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
    this.onSearch();
    this.cancelCurrentLocation();
  }

  private update(value: ILocationAddress): void {
    for (let i = 0; i < this.locations.length; i++) {
      if (JSON.stringify(this.locations[i]) === JSON.stringify(this.currentLocation)) {
        this.locations.splice(i, 1, value);
        break;
      }
    }
    this.rewriteStorage();
    this.onSearch();
    this.cancelCurrentLocation();
  }
}