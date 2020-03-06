import { Injectable, EventEmitter } from '@angular/core';
import { PositionInfo } from 'src/app/models/hr/position-info';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { OperationResponse } from '../../../../../../common/model/operation-response';

@Injectable()
export class PositionService {

   private allPositions: Array<PositionInfo>;

   positionsChanged = new EventEmitter();

   get AllPositions(): Array<PositionInfo> {
      return this.allPositions || new Array<PositionInfo>();
   }

   addPosition(position: PositionInfo): OperationResponse {
      const response = new OperationResponse();
      const validationError = this.getValidationError(position);
      if (validationError.length !== 0) {
         response.success = false;
         response.error = validationError;
         return response;
      }
      this.assignIdForNewPosition(position);
      this.allPositions.push(position);
      this.refreshData();
      return response;
   }

   updatePosition(position: PositionInfo): OperationResponse {
      const response = new OperationResponse();
      const validationError = this.getValidationError(position);
      if (validationError.length !== 0) {
         response.success = false;
         response.error = validationError;
         return response;
      }
      const currentPosition = this.allPositions.find(p => p.id === position.id);
      currentPosition.title = position.title;
      currentPosition.requirements = position.requirements;
      this.refreshData();
      return response;
   }

   deletePosition(position: PositionInfo): OperationResponse {
      this.allPositions = this.allPositions.filter(p => p.id !== position.id);
      this.refreshData();
      return new OperationResponse();
   }

   getValidationError(position: PositionInfo): string {
      let response = '';
      if (this.allPositions.some(p => p.title.trim() === position.title.trim()
         && p.id !== position.id)) {
         response = 'Позиция с таким названием уже существует!';
      }
      return response;
   }

   constructor(private storageService: StorageService) {
      this.readStorage();
   }

   private readStorage() {
      this.allPositions = this.storageService.getData(StorageKey.EmployeePositionsStorageKey)
         || new Array<PositionInfo>();
      this.allPositions = this.allPositions.map(p => {
         const info = new PositionInfo();
         info.initFrom(p);
         return info;
      });
      this.allPositions = this.allPositions.filter(p => p && (p.title && p.title.length > 0)
         && (p.requirements && p.requirements.length > 0));
   }

   private writeStorage() {
      this.storageService.setData(StorageKey.EmployeePositionsStorageKey, this.allPositions);
   }

   private assignIdForNewPosition(position: PositionInfo) {
      if (this.allPositions.length > 0) {
         position.id = this.allPositions[this.allPositions.length - 1].id + 1;
      } else {
         position.id = 1;
      }
   }

   private refreshData() {
      this.writeStorage();
      this.readStorage();
      this.positionsChanged.emit();
   }


}
