import { Component, OnInit, Input } from '@angular/core';
import { IWorkSite } from 'src/app/models/plot/work-site';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-table-work-site-for-office',
  templateUrl: './table-work-site-for-office.component.html',
  styleUrls: ['./table-work-site-for-office.component.scss']
})
export class TableWorkSiteForOfficeComponent implements OnInit {
  private canOpenTable: boolean;
  private isOpenForm: boolean;
  private canUseFuilter: boolean = false;

  private idForSearch: number;
  private nameForSearch: string;

  private currentWorkSite: IWorkSite;
  private workSites = new Array<IWorkSite>();
  private changeableWorkSites = new Array<IWorkSite>();

  @Input() set isOpenTableForWorkSiteOfOffice(value: boolean) { this.canOpenTable = value; }

  constructor(private updateDataService: DataService, private storage: StorageService) {
    this.updateDataService.dataForOffice.subscribe(data => {
      this.workSites = [];
      this.changeableWorkSites = [];
      this.workSites = data;
      this.changeableWorkSites = data;
    })
   }

  ngOnInit() {
    this.getWorkSitesByStorage(StorageKey.WorkSiteForOffice);
  }

  private displayFilters(): void {
    this.canUseFuilter = (this.canUseFuilter === true) ? false : true;
    this.onCancel();
  }

  private getWorkSitesByStorage(storageKey: StorageKey): void {
    this.workSites = [];
    this.workSites = this.storage.getData(storageKey);
    this.changeableWorkSites = [];
    this.changeableWorkSites = this.storage.getData(storageKey);
  }

  private onRowClick(workSite: IWorkSite): void {
    this.currentWorkSite = workSite;
    this.isOpenForm = true;
  }
  
  private onCancel(): void {
    this.getWorkSitesByStorage(StorageKey.WorkSiteForOffice);
    this.idForSearch = null;
    this.nameForSearch = '';
  }

  private onSearch(): void {
    if (this.workSites != null) {
      this.updateDataService.setWorkSiteForOffice();
      this.changeableWorkSites = [];
      if (this.idForSearch != null) {
        this.changeableWorkSites = this.searchWorkSitesByIdAndName(this.idForSearch, this.nameForSearch);
      }
      else if (this.idForSearch != null) {
        this.changeableWorkSites = this.searchWorkSitesById(this.idForSearch);
      }
      else if (this.nameForSearch != '') {
        this.changeableWorkSites = this.searchWorkSitesByAddress(this.nameForSearch);
      }
      else {
        this.changeableWorkSites = this.workSites;
      }
    }
  }

  private searchWorkSitesByIdAndName(id: number, value: string): Array<IWorkSite> {
    const workSitesByIdAndName = new Array<IWorkSite>();
    this.workSites.forEach((workSite: IWorkSite) => {
      if (workSite.id == id && workSite.name.includes(value)) {
        workSitesByIdAndName.push(workSite);
      }
    })
    return workSitesByIdAndName;
  }

  private searchWorkSitesById(id: number): Array<IWorkSite> {
    const workSitesById = new Array<IWorkSite>();
    this.workSites.forEach((workSite: IWorkSite) => {
      if (workSite.id === id) {
        workSitesById.push(workSite);
      }
    })
    return workSitesById;
  }

  private searchWorkSitesByAddress(value: string): Array<IWorkSite> {
    const workSitesByName = new Array<IWorkSite>();
    this.workSites.forEach((workSite: IWorkSite) => {
      if (workSite.name.includes(value)) {
        workSitesByName.push(workSite);
      }
    })
    return workSitesByName;
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKey.WorkSiteForOffice);
    this.workSites.forEach(item => {
      this.storage.addData(StorageKey.WorkSiteForOffice, item);
    });
  }

  private cancelCurrentWorkSite(): void {
    this.currentWorkSite = null;
    this.isOpenForm = false;
  }

  private delete(value: IWorkSite): void {
    for (let i = 0; i < this.workSites.length; i++) {
      if (JSON.stringify(this.workSites[i]) === JSON.stringify(value)) {
        this.workSites.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
    this.onSearch();
    this.cancelCurrentWorkSite();
  }

  private update(value: IWorkSite): void {
    for (let i = 0; i < this.workSites.length; i++) {
      if (JSON.stringify(this.workSites[i]) === JSON.stringify(this.currentWorkSite)) {
        this.workSites.splice(i, 1, value);
        break;
      }
    }
    this.rewriteStorage();
    this.onSearch();
    this.cancelCurrentWorkSite();
  }
}
