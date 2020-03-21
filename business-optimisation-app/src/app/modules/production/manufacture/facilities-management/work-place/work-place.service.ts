import { Injectable, EventEmitter, ɵConsole } from '@angular/core';
import { WorkPlace } from 'src/app/models/facilities-management/work-place';
import { WorkPlaceDTO, LocationDTO, WorkAreaDTO } from 'swagger-client';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { HistoryService } from '../history.service';
import { WorkAreaService } from '../work-area/work-area.service';

@Injectable({
  providedIn: 'root'
})
export class WorkPlaceService {
  private idForChange: number = 0;
  private workPlaces: Array<WorkPlace> = [];
  private workPlacesDTO: Array<WorkPlaceDTO> = [];

  public addNewWorkPlace = new EventEmitter<WorkPlace>();
  public removeWorkPlace = new EventEmitter<number>();
  public changeWorkPlace = new EventEmitter<WorkPlace>();
  public variableWorkPlace = new EventEmitter<WorkPlace>();

  constructor(private storageService: StorageService, private history: HistoryService, private workAreaService: WorkAreaService) {
    this.workPlaces = this.getAllWorkPlaces();
    this.workPlacesDTO = this.getAllWortPlacesDTO();
  }

  private getAllWortPlacesDTO(): Array<WorkPlaceDTO> {
    let workPlaces: Array<WorkPlaceDTO> = [];
    if (this.storageService.hasKey(StorageKey.WorkPlaces)) {
      workPlaces = this.storageService.getTypedArray(StorageKey.WorkPlaces);
    }
    return workPlaces;
  }

  public getAllWorkPlaces(): Array<WorkPlace> {
    let workPlaces: Array<WorkPlace> = [];
    if (this.storageService.hasKey(StorageKey.WorkPlaces)) {
      workPlaces = this.storageService.getTypedArray(StorageKey.WorkPlaces);
    }
    return workPlaces;
  }

  public getWorkAreaByName(name: string): WorkPlace {
    return this.workPlaces.find(d => d.name == name);
  }

  private incrementIndex(): number {
    let index: number = 1;
    if (this.workPlacesDTO.length > 0) {
      const allLeght = this.workPlacesDTO.length;
      index = this.workPlacesDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  private getWorkAreaId(id: number): number {
    return this.workPlaces.map(l => { return l.id; }).indexOf(id);
  }

  private convertToWorkPlaceDTO(workPlace: WorkPlace): WorkPlaceDTO {
    const wp = <WorkPlaceDTO>{
      id: workPlace.id,
      name: workPlace.name,
      floor: workPlace.floor,
      comment: workPlace.comment,
      location: <LocationDTO>workPlace.location,
      workArea: this.workAreaService.convertToWorkAreaDTO(workPlace.workArea)
    };
    return wp;
  }  
  
  public add(wp: WorkPlace): void {
    wp.id = this.incrementIndex();
    const workPlace: WorkPlaceDTO = this.convertToWorkPlaceDTO(wp);
    this.workPlaces.push(wp);
    this.workPlacesDTO.push(workPlace);
    this.addNewWorkPlace.emit(wp);
    this.storageService.addData(StorageKey.WorkPlaces, workPlace);
    this.history.addPointInHistory('WorkPlace', workPlace);
  }

  public remove(workPlace: WorkPlace): void {
    const idForRemove = this.getWorkAreaId(workPlace.id);

    this.workPlaces.splice(idForRemove, 1);
    this.workPlacesDTO.splice(idForRemove, 1);

    this.removeWorkPlace.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('WorkPlace', workPlace, workPlace);
  }

  public change(wp: WorkPlace, oldWorkPlace: WorkPlace): void {
    wp.id =oldWorkPlace.id;
    const changableWorkPlace: WorkPlaceDTO =  this.convertToWorkPlaceDTO(wp);

    this.idForChange = this.getWorkAreaId(oldWorkPlace.id);
    this.workPlaces[this.idForChange] = wp;
    this.workPlacesDTO[this.idForChange] = changableWorkPlace;

    this.changeWorkPlace.emit(wp);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('WorkPlace', changableWorkPlace, this.convertToWorkPlaceDTO(oldWorkPlace));
  }

  public getWorkPlaceIdForChange(): number {
    return this.idForChange;
  }

  public setWorkAreaById(id: number): void {
    const workArea = this.workPlaces.find((workArea: WorkPlace) => workArea.id == id);
    this.variableWorkPlace.emit(workArea);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.WorkPlaces);
    this.workPlacesDTO.forEach((workPlace: WorkPlaceDTO) => {
      this.storageService.addData(StorageKey.WorkPlaces, workPlace);
    })
  }
}
