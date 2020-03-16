import { Injectable, EventEmitter } from '@angular/core';
import { Location } from "../../../../../models/facilities-management/location";
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { LocationDTO } from 'swagger-client';
import { AddressService } from './addesss.service';
import { HistoryService } from '../history.service';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private locationsDTO: Array<LocationDTO> = [];
  private locations: Array<Location> = [];
  private currentLocation: LocationDTO = null;
  private idForChange: number = 0;

  public addNewLocation = new EventEmitter<Location>();
  public removeLocation = new EventEmitter<number>();
  public changeLocation = new EventEmitter<Location>();
  public variableLocation = new EventEmitter<Location>();

  constructor(private storageService: StorageService, private history: HistoryService, private addressService: AddressService) {
    this.locationsDTO = this.getAllLocationsDTO();
    this.locations = this.getAllLocations();
  }

  private getLocationId(id: number): number {
    return this.locations.map(l => { return l.id; }).indexOf(id);
  }

  private getAllLocationsDTO(): Array<LocationDTO> {
    let locations = [];
    if (this.storageService.hasKey(StorageKey.Locations)) {
      locations = this.storageService.getTypedArray(StorageKey.Locations);
    }
    return locations;
  }

  public getAllLocations(): Array<Location> {
    let locations: Array<Location> = [];
    if (this.storageService.hasKey(StorageKey.Locations)) {
      locations = this.storageService.getTypedArray(StorageKey.Locations);
    }
    return locations;
  }

  public setLocationById(id: number): void {
    const location = this.locations.find((location: Location) => location.id == id);
    this.variableLocation.emit(location);
  }

  public getLocationIdForChange(): number {
    return this.idForChange;
  }

  private incrementIndex(): number {
    let index: number = 1;
    if (this.locationsDTO.length > 0) {
      const allLeght = this.locationsDTO.length;
      index = this.locationsDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  public add(newLocation: Location, oldLocation?: Location): void {
    this.currentLocation = newLocation;
    this.currentLocation.id = this.incrementIndex();
    this.currentLocation.address = this.addressService.getCurrentAddress();

    this.locations.push(<Location>this.currentLocation);
    this.locationsDTO.push(this.currentLocation);

    this.addNewLocation.emit(<Location>this.currentLocation);
    this.storageService.addData(StorageKey.Locations, this.currentLocation);
    this.history.addPointInHistory('Location', this.currentLocation, oldLocation);
  }

  public remove(location: Location): void {
    const idForRemove = this.getLocationId(location.id);

    this.locations.splice(idForRemove, 1);
    this.locationsDTO.splice(idForRemove, 1);

    this.removeLocation.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Location', location, location);
  }

  public change(location: Location, oldLocation: Location): void {
    const changableLocation: LocationDTO = location;
    changableLocation.id = oldLocation.id;
    changableLocation.address = this.addressService.getCurrentAddress();

    this.idForChange = this.getLocationId(oldLocation.id);
    this.locations[this.idForChange] = <Location>changableLocation;
    this.locationsDTO[this.idForChange] = changableLocation;

    this.changeLocation.emit(<Location>changableLocation);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Location', changableLocation, <LocationDTO>oldLocation);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.Locations);
    this.locationsDTO.forEach((location: LocationDTO) => {
      this.storageService.addData(StorageKey.Locations, location);
    })
  }
}