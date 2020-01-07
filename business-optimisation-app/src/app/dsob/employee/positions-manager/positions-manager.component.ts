import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';

@Component({
  selector: 'app-positions-manager',
  templateUrl: './positions-manager.component.html',
  styleUrls: ['./positions-manager.component.css']
})
export class PositionsManagerComponent implements OnInit {

  filteredPositions: Array<PositionInfo>;
  newPosition: PositionInfo;

  private allPositions: Array<PositionInfo>;
  private editPositionId = -1;

  constructor(private storageService: StorageService) {
    this.newPosition = new PositionInfo();
  }

  ngOnInit() {
    this.readStorage();
    this.applyFiltration();
  }

  onAdd() {
    this.assignIdForNewPosition();
    this.allPositions.push(this.newPosition);
    this.newPosition = new PositionInfo();
    this.refreshData();
  }

  onEdit(position: PositionInfo) {
    if (position.id === this.editPositionId) {
      this.editPositionId = -1;
    } else {
      this.editPositionId = position.id;
    }
  }

  onDeleteClick(position: PositionInfo) {
    this.allPositions = this.allPositions.filter(p => p.id !== position.id);
    this.refreshData();
  }

  isReadonlyForPosition(position: PositionInfo) {
    return position.id !== this.editPositionId;
  }

  editCaptionFor(position): string {
    if (position.id === this.editPositionId) {
      return 'Отмена';
    } else {
      return 'Изменить';
    }
  }

  editButtonClassFor(position): string {
    if (position.id === this.editPositionId) {
      return 'btn btn-light';
    } else {
      return 'btn btn-warning';
    }
  }

  saveVisibleFor(position): boolean {
    return position.id === this.editPositionId;
  }

  private refreshData() {
    this.writeStorage();
    this.readStorage();
    this.applyFiltration();
  }

  private readStorage() {
    this.allPositions = this.storageService.getData(StorageKey.EmployeePositionsStorageKey)
                              || new Array<PositionInfo>();
  }

  private writeStorage() {
    this.storageService.setData(StorageKey.EmployeePositionsStorageKey, this.allPositions);
  }

  private assignIdForNewPosition() {
    if (this.allPositions.length > 0) {
      this.newPosition.id = this.allPositions[this.allPositions.length - 1].id + 1;
    } else {
      this.newPosition.id = 1;
    }
  }

  private applyFiltration() {
    // TODO: provide real filtration
    this.filteredPositions = this.allPositions.filter(p => p);
  }

}
