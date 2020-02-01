import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Plot } from 'src/app/models/plot/plot';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { Validation } from './validation';
import { IWorkSite } from 'src/app/models/plot/work-site';
import { productionDepartments, IDepartment } from 'src/app/models/plot/department';
import { DataService } from '../data.service';

@Component({
  selector: 'app-plots-form',
  templateUrl: './plots-form.component.html',
  styleUrls: ['./plots-form.component.scss']
})

export class PlotsFormComponent implements OnInit {

  readonly GUILD_ID = 1;
  readonly OFFICE_ID = 2;

  floor: AbstractControl;
  workSite: AbstractControl;
  room: AbstractControl;
  place: AbstractControl;

  private plotsForm: FormGroup;
  private departmentId: number;
  private productionDepartments = new Array<string>();
  private locations = new Array<ILocationAddress>();
  private workSites = new Array<IWorkSite>();
  private groupOfPlots = new Array<Plot>();
  private validation: Validation;
  private sideCode = new Array<number>();

  private canDisplayPartOfOfficeForm: boolean;
  private canDisplayPartOfGuildForm: boolean;
  private canDisplayForm: boolean;

  @Input() set openForm(value: boolean) { this.canDisplayForm = value; }
  @Output() closedForm = new EventEmitter<boolean>();

  constructor(private updateDataService: DataService, private storage: StorageService) {
    this.initProductionDepartment();
    this.initDatalist(StorageKey.LocationAddresses, this.locations);
    this.initDatalist(StorageKey.Plots, this.groupOfPlots);
    this.updateDataService.dataForLocation.subscribe(data => {
      this.locations = [];
      this.locations = data;
    });
    this.updateDataService.dataForOffice.subscribe(data => {
      this.setPartOfForm(this.departmentId);
    })
    this.updateDataService.dataForGuild.subscribe(data => {
      this.setPartOfForm(this.departmentId);
    })
  }

  ngOnInit() {
    this.createForm();
    this.initValidation();
  }

  private createForm(): void {
    this.plotsForm = new FormGroup({
      commonInfo: new FormGroup({
        address: new FormControl(null),
        productionDepartment: new FormControl(null)
      }),
      detailsInfo: new FormGroup({
        floor: new FormControl(null),
        workSite: new FormControl(null),
        room: new FormControl(null),
        place: new FormControl(null)
      })
    });
  }

  private initValidation(): void {
    this.floor = this.plotsForm.get('detailsInfo.floor');
    this.workSite = this.plotsForm.get('detailsInfo.workSite');
    this.room = this.plotsForm.get('detailsInfo.room');
    this.place = this.plotsForm.get('detailsInfo.place');
    this.validation = new Validation(this.floor, this.workSite, this.room, this.place);
    this.validation.clearValidations();
  }

  private initProductionDepartment(): void {
    productionDepartments.forEach((department: IDepartment) => {
      this.productionDepartments.push(department.value);
    });
  }

  private initDatalist<T>(stogareKey: StorageKey, arrayToInilialize: Array<T>): void {
    arrayToInilialize.length = 0;
    if (this.storage.hasKey(stogareKey)) {
      const storageArray = this.storage.getData(stogareKey);
      storageArray.forEach((value: T) => {
        arrayToInilialize.push(value);
      });
    }
  }

  private checkTypeOfDepartment(): void {
    const productionDepartment = this.plotsForm.get("commonInfo.productionDepartment").value;
    for (let department of productionDepartments) {
      if (department.value === productionDepartment) {
        this.setPartOfForm(department.key);
        this.departmentId = department.key;
        break;
      }
    }
  }

  private setPartOfForm(key: number): void {
    switch (key) {
      case this.GUILD_ID: {
        this.initDatalist(StorageKey.WorkSiteForGuild, this.workSites);
        this.validation.setValidatorsForGuild();
        this.canDisplayPartOfOfficeForm = false;
        this.canDisplayPartOfGuildForm = true;
        break;
      }
      case this.OFFICE_ID: {
        this.initDatalist(StorageKey.WorkSiteForOffice, this.workSites);
        this.validation.setValidatorsForOffice();
        this.canDisplayPartOfOfficeForm = true;
        this.canDisplayPartOfGuildForm = false;
        break;
      }
      default: {
        this.validation.clearValidations();
        this.canDisplayPartOfOfficeForm = false;
        this.canDisplayPartOfGuildForm = false;
        break;
      }
    }
    this.validation.updateValidators();
  }

  private onSave(): void {
    this.sideCode.length = 0;
    let newPlot: Plot = new Plot();
    newPlot.address = this.plotsForm.get('commonInfo.address').value;
    newPlot.productionDepartment = this.plotsForm.get('commonInfo.productionDepartment').value;
    const locationId = this.checkingForExistenceOfDatalist(newPlot.address, this.locations, StorageKey.LocationAddresses);
    this.sideCode.push(locationId);
    this.sideCode.push(this.departmentId);
    if (this.sideCode[1] == this.GUILD_ID) {
      newPlot.floor = this.floor.value;
      newPlot.workSite = this.workSite.value;
      newPlot.place = this.place.value;
      const workSideId = this.checkingForExistenceOfDatalist(newPlot.workSite, this.workSites, StorageKey.WorkSiteForGuild);
      this.sideCode.push(newPlot.floor);
      this.sideCode.push(workSideId);
      this.sideCode.push(newPlot.place);
    }
    else if (this.sideCode[1] == this.OFFICE_ID) {
      newPlot.floor = this.floor.value;
      newPlot.workSite = this.workSite.value;
      newPlot.room = this.room.value;
      newPlot.place = this.place.value;
      const workSideId = this.checkingForExistenceOfDatalist(newPlot.workSite, this.workSites, StorageKey.WorkSiteForOffice);
      this.sideCode.push(newPlot.floor);
      this.sideCode.push(workSideId);
      this.sideCode.push(newPlot.room);
      this.sideCode.push(newPlot.place);
    }
    newPlot.id = this.createIdForPlot(this.sideCode);
    this.groupOfPlots.push(newPlot);
    this.rewriteStorage(StorageKey.Plots, this.groupOfPlots);
    this.plotsForm.reset();
  }

  private createIdForPlot(partOfId: Array<number>): string {
    return partOfId.join('.');
  }

  private checkingForExistenceOfDatalist(element: string, checkedArray: Array<any>, storageKey: StorageKey): number {
    let elemId: number;
    let flag: boolean;
    if (checkedArray != null) {
      for (let value of checkedArray) {
        if (value.name == element) {
          flag = true;
          elemId = value.id;
          break;
        }
      }
    }
    if (!flag) {
      let sizeArray = (checkedArray == null) ? 0 : checkedArray.length;
      let newId = ((sizeArray === 0) ? 0 : (checkedArray[--sizeArray].id)) + 1;
      let newElement = <any>{ id: newId, name: element };
      checkedArray.push(newElement);
      elemId = newId;
      this.rewriteStorage(storageKey, checkedArray);
      this.updateValusForWorkSite(storageKey);
    }
    return elemId;
  }

  private updateValusForWorkSite(storageKey: StorageKey): void {
    switch (storageKey) {
      case StorageKey.WorkSiteForOffice:
        this.updateDataService.setWorkSiteForOffice();
        break;
      case StorageKey.WorkSiteForGuild:
        break;
    }
  }

  private rewriteStorage<T>(stogareKey: StorageKey, data: Array<T>): void {
    this.storage.deleteData(stogareKey);
    data.forEach((value: T) => {
      this.storage.addData(stogareKey, value);
    });
  }

  private onCancel(): void {
    this.closedForm.emit(false);
    this.plotsForm.reset();
  }
}