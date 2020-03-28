import { Injectable, EventEmitter } from '@angular/core';
import { StorageKey, StorageService } from 'src/app/services/storage.service';
import { WorkAreaDTO, DepartmentDTO } from 'swagger-client/client';
import { WorkArea } from 'src/app/models/facilities-management/work-area';
import { HistoryService } from '../history.service';

@Injectable({
  providedIn: 'root'
})
export class WorkAreaService {
  private idForChange: number = 0;
  private workAreas: Array<WorkArea> = [];
  private workAreaDTO: Array<WorkAreaDTO> = [];

  public addNewWorkArea = new EventEmitter<WorkArea>();
  public removeWorkArea = new EventEmitter<number>();
  public changeWorkArea = new EventEmitter<WorkArea>();
  public variableWorkArea = new EventEmitter<WorkArea>();

  constructor(private storageService: StorageService, private history: HistoryService) {
    this.workAreas = this.getAllWorkAreas();
    this.workAreaDTO = this.getAllWortAreasDTO();
  }

  private getAllWortAreasDTO(): Array<WorkAreaDTO> {
    let workAreas: Array<WorkAreaDTO> = [];
    if (this.storageService.hasKey(StorageKey.WorkAreas)) {
      workAreas = this.storageService.getTypedArray(StorageKey.WorkAreas);
    }
    return workAreas;
  }

  public getAllWorkAreas(): Array<WorkArea> {
    let workAreas: Array<WorkArea> = [];
    if (this.storageService.hasKey(StorageKey.WorkAreas)) {
      workAreas = this.storageService.getTypedArray(StorageKey.WorkAreas);
    }
    return workAreas;
  }

  public getWorkAreaByName(name: string): WorkArea {
    return this.workAreas.find(d => d.name == name);
  }

  public convertToWorkAreaDTO(wa: WorkArea): WorkAreaDTO {
    const workArea = <WorkAreaDTO>{
      id: wa.id,
      name: wa.name,
      department: <DepartmentDTO>{
        id: wa.department.id,
        name: wa.department.name,
        type: wa.department.type
      }
    };
    return workArea;
  }

  private incrementIndex(): number {
    let index: number = 1;
    if (this.workAreaDTO.length > 0) {
      const allLeght = this.workAreaDTO.length;
      index = this.workAreaDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  private getWorkAreaId(id: number): number {
    return this.workAreas.map(l => { return l.id; }).indexOf(id);
  }

  public add(wa: WorkArea): void {
    wa.id = this.incrementIndex();
    const workArea: WorkAreaDTO = this.convertToWorkAreaDTO(wa);
    this.workAreas.push(wa);
    this.workAreaDTO.push(workArea);
    this.addNewWorkArea.emit(wa);

    this.storageService.addData(StorageKey.WorkAreas, workArea);
    this.history.addPointInHistory('WorkArea', workArea);
  }

  public remove(wa: WorkArea): void {
    const idForRemove = this.getWorkAreaId(wa.id);
    const workArea = this.convertToWorkAreaDTO(wa);
    this.workAreas.splice(idForRemove, 1);
    this.workAreaDTO.splice(idForRemove, 1);

    this.removeWorkArea.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('WorkArea', workArea, workArea);
  }

  public change(wa: WorkArea, oldWorkArea: WorkArea): void {
    wa.id = oldWorkArea.id;
    const changableWorkArea: WorkAreaDTO = this.convertToWorkAreaDTO(wa);

    this.idForChange = this.getWorkAreaId(oldWorkArea.id);
    this.workAreas[this.idForChange] = wa;
    this.workAreaDTO[this.idForChange] = changableWorkArea;

    this.changeWorkArea.emit(wa);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('WorkArea', changableWorkArea, this.convertToWorkAreaDTO(oldWorkArea));
  }

  public getWorkAreaIdForChange(): number {
    return this.idForChange;
  }

  public setWorkAreaById(id: number): void {
    const workArea = this.workAreas.find((workArea: WorkArea) => workArea.id == id);
    this.variableWorkArea.emit(workArea);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.WorkAreas);
    this.workAreaDTO.forEach((workArea: WorkAreaDTO) => {
      this.storageService.addData(StorageKey.WorkAreas, workArea);
    })
  }
}
