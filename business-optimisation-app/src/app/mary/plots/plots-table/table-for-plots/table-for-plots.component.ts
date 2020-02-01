import { Component, OnInit, Input } from '@angular/core';
import { Plot } from 'src/app/models/plot/plot';
import { StorageKey, StorageService } from 'src/app/services/storage.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-table-for-plots',
  templateUrl: './table-for-plots.component.html',
  styleUrls: ['./table-for-plots.component.scss']
})
export class TableForPlotsComponent implements OnInit {

  private canOpenTable: boolean;
  private isOpenPlotForm: boolean;
  private canUseFuilter: boolean = false;

  idForFuilter: string;
  addressForFuilter: string;
  productionDepartmentForFuilter: string;
  floorForFuilter: number;
  workSiteForFuilter: string;
  roomForFuilter: number;
  placeForFuilter: number;

  private currentPlot: Plot;
  private plots = new Array<Plot>();
  private changeablePlots = new Array<Plot>();

  @Input() set isOpenTableForPlots(value: boolean) { this.canOpenTable = value; }

  constructor(private updateDataService: DataService, private storage: StorageService) {
    this.updateDataService.dataForLocation.subscribe(data => {
      this.plots = [];
      this.changeablePlots = [];
      this.plots = data;
      this.changeablePlots = data;
    })
  }

  ngOnInit() {
    this.getPlotsByStorage(StorageKey.Plots);
  }

  private getPlotsByStorage(storageKey: StorageKey): void {
    this.plots = [];
    this.plots = this.storage.getData(storageKey);
    this.changeablePlots = [];
    this.changeablePlots = this.storage.getData(storageKey);
  }

  private onRowClick(location: Plot): void {
    this.currentPlot = location;
    this.isOpenPlotForm = true;
  }

  private displayFilters(): void {
    this.canUseFuilter = (this.canUseFuilter === true) ? false : true;
    this.onCancel();
  }

  /*-private onSearch(): void {
    if (this.plots != null) {
      this.updateDataService.setLocations();
      this.changeablePlots = [];
      if (this.idSearch != null) {
        this.changeablePlots = this.searchLocationByIdAndAddress(this.idSearch, this.addressSearch);
      }
      else if (this.idSearch != null) {
        this.changeablePlots = this.searchLocationsById(this.idSearch);
      }
      else if (this.addressSearch != '') {
        this.changeablePlots = this.searchLocatinonByAddress(this.addressSearch);
      }
      else {
        this.changeablePlots = this.plots;
      }
    }
  }*/

  /*private searchLocationByIdAndAddress(id: number, value: string): Array<ILocationAddress> {
    const locationsByIdandAddress = new Array<ILocationAddress>();
    this.plots.forEach((address: ILocationAddress) => {
      if (address.id == id && address.name.includes(value)) {
        locationsByIdandAddress.push(address);
      }
    })
    return locationsByIdandAddress;
  }

  private searchLocationsById(id: number): Array<ILocationAddress> {
    const locatinsById = new Array<ILocationAddress>();
    this.plots.forEach((address: ILocationAddress) => {
      if (address.id === id) {
        locatinsById.push(address);
      }
    })
    return locatinsById;
  }

  private searchLocatinonByAddress(value: string): Array<ILocationAddress> {
    const locatinsByAddress = new Array<ILocationAddress>();
    this.plots.forEach((address: ILocationAddress) => {
      if (address.name.includes(value)) {
        locatinsByAddress.push(address);
      }
    })
    return locatinsByAddress;
  }*/

  private onCancel(): void {
    this.getPlotsByStorage(StorageKey.Plots);
    this.idForFuilter = null;
    this.addressForFuilter = '';
    this.productionDepartmentForFuilter = '';
    this.floorForFuilter = null;
    this.workSiteForFuilter = null;
    this.roomForFuilter = null;
    this.placeForFuilter = null;
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKey.Plots);
    this.plots.forEach(item => {
      this.storage.addData(StorageKey.Plots, item);
    });
  }

  private cancelCurrentPlot(): void {
    this.currentPlot = null;
    this.isOpenPlotForm = false;
  }

  private delete(value: Plot): void {
    for (let i = 0; i < this.plots.length; i++) {
      if (JSON.stringify(this.plots[i]) === JSON.stringify(value)) {
        this.plots.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
    // this.onSearch();
    this.cancelCurrentPlot();
  }

  private update(value: Plot): void {
    for (let i = 0; i < this.plots.length; i++) {
      if (JSON.stringify(this.plots[i]) === JSON.stringify(this.currentPlot)) {
        this.plots.splice(i, 1, value);
        break;
      }
    }
    this.rewriteStorage();
    //  this.onSearch();
    this.cancelCurrentPlot();
  }
}
