import { Injectable, EventEmitter } from '@angular/core';
import { Location } from "../../../../../models/facilities-management/location";
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { LocationDTO, AddressDTO } from 'swagger-client/client';
import { AddressService } from './addesss.service';
import { HistoryService } from '../history.service';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private locationsDTO: Array<LocationDTO> = [];
  private locations: Array<Location> = [];
  private idForChange: number = 0;

  public addNewLocation = new EventEmitter<Location>();
  public removeLocation = new EventEmitter<number>();
  public changeLocation = new EventEmitter<Location>();
  public variableLocation = new EventEmitter<Location>();

  constructor(private storageService: StorageService, private history: HistoryService, private addressService: AddressService) {
    this.locationsDTO = this.getAllLocationsDTO();
    this.locations = this.getAllLocations();
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

  private getLocationId(id: number): number {
    return this.locations.map(l => { return l.id; }).indexOf(id);
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

  private convertToLocationDTO(l: Location): LocationDTO {
    const location = <LocationDTO>{
      id: l.id,
      comment: l.comment,
      address: <AddressDTO>{
        id: l.address.id,
        city: l.address.city,
        street: l.address.street,
        buildingNumber: l.address.buildingNumber,
        floors: l.address.floors
      }
    }
    return location;
  }

  public add(l: Location): void {
    l.id = this.incrementIndex();
    l.address = this.addressService.getAddress();
    const location = this.convertToLocationDTO(l);
    this.locations.push(l);
    this.locationsDTO.push(location);

    this.addNewLocation.emit(l);
    this.storageService.addData(StorageKey.Locations, location);
    this.history.addPointInHistory('Location', location);
  }

  public remove(l: Location): void {
    const location = this.convertToLocationDTO(l);
    const idForRemove = this.getLocationId(l.id);

    this.locations.splice(idForRemove, 1);
    this.locationsDTO.splice(idForRemove, 1);

    this.removeLocation.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Location', location, location);
  }

  public change(l: Location, oldL: Location): void {
    l.id= oldL.id;
    l.address = this.addressService.getAddress();
    const location = this.convertToLocationDTO(l);

    this.idForChange = this.getLocationId(oldL.id);
    this.locations[this.idForChange] = l;
    this.locationsDTO[this.idForChange] = location;

    this.changeLocation.emit(l);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Location', location, this.convertToLocationDTO(oldL));
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.Locations);
    this.locationsDTO.forEach((location: LocationDTO) => {
      this.storageService.addData(StorageKey.Locations, location);
    })
  }
}