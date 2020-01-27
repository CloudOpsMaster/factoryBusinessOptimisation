import { Component, OnInit, Input } from '@angular/core';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { StorageService, StorageKey } from 'src/app/services/storage.service';

@Component({
  selector: 'app-table-for-location',
  templateUrl: './table-for-location.component.html',
  styleUrls: ['./table-for-location.component.scss']
})
export class TableForLocationComponent implements OnInit {
  private table: boolean;
  private openForm: boolean;
  private filters: boolean = false;
  private idSearch: number;
  private addressSearch: string = '';
  private currentLocation: ILocationAddress;
  private addressLocations = new Array<ILocationAddress>();
  private filteredData = new Array<ILocationAddress>();
  private storage = new StorageService();
  @Input() set openTableForLocation(value: boolean) { this.table = value; }

  constructor() {
    this.getLocationWithStorage();
  }

  ngOnInit() {
    this.getLocationWithStorage();
  }

  private getLocationWithStorage(): void {
    this.addressLocations = this.storage.getData(StorageKey.LocationAddresses);
    this.filteredData = this.storage.getData(StorageKey.LocationAddresses);
  }

  private onRowClick(addressLocation: ILocationAddress): void {
    this.currentLocation = addressLocation;
    this.openForm = true;
  }

  private displayOfFilters(): void {
    if (this.filters === true) {
      this.filters = false;
    }
    else {
      this.filters = true;
    }
    this.onCancel();
  }

  private onSearch(): void {
    this.filteredData.length = 0;
    if (this.idSearch != null) {
      this.addressLocations.forEach((address: ILocationAddress) => {
        if (address.id === this.idSearch) {
          this.filteredData.push(address);
        }
      })
    }
    else if (this.addressSearch != '') {
      this.addressLocations.forEach((address: ILocationAddress) => {
        if (address.name.includes(this.addressSearch)) {
          this.filteredData.push(address);
        }
      })
    }
  }

  private onCancel(): void {
    this.filteredData = this.storage.getData(StorageKey.LocationAddresses);
    this.idSearch = null;
    this.addressSearch = '';
  }
}
