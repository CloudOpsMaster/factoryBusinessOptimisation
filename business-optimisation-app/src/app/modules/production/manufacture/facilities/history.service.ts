import { Injectable, EventEmitter } from '@angular/core';
import { History } from 'src/app/models/common/history';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { FacilitiesHistoryDTO } from 'swagger-client/client';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private pointsInHistory: Array<FacilitiesHistoryDTO> = [];
  private currentHistory: FacilitiesHistoryDTO = null;
  public changeArrayofHistory = new EventEmitter<History>();

  constructor(private storageService: StorageService) {
    this.pointsInHistory = this.getAllHistoryDTO();
  }

  public getAllHistory(): Array<History> {
    let arrayOfHistory: Array<History> = [];
    if (this.storageService.hasKey(StorageKey.FacilitiesManagementHistory)) {
      arrayOfHistory = this.storageService.getTypedArray(StorageKey.FacilitiesManagementHistory);
    }
    return arrayOfHistory;
  }

  private getAllHistoryDTO(): Array<FacilitiesHistoryDTO> {
    let arrayOfHistory: Array<FacilitiesHistoryDTO> = [];
    if (this.storageService.hasKey(StorageKey.FacilitiesManagementHistory)) {
      arrayOfHistory = this.storageService.getTypedArray(StorageKey.FacilitiesManagementHistory);
    }
    return arrayOfHistory;
  }

  public addPointInHistory<T>(type: string, newInfo?: T, oldInfo?: T): void {
    this.currentHistory = <FacilitiesHistoryDTO>{
      id: this.incrementIndex(),
      date: new Date(),
      type: type,
      newInfo: newInfo,
      oldInfo: oldInfo
    };
    this.storageService.addData(StorageKey.FacilitiesManagementHistory, this.currentHistory);
    this.pointsInHistory.push(this.currentHistory);
    this.changeArrayofHistory.emit(<History>this.currentHistory);
  }

  private incrementIndex(): number {
    let index: number = 0;
    if (this.pointsInHistory != null) {
      index = this.pointsInHistory.length;
    }
    return index;
  }
}