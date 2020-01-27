import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Plot } from 'src/app/models/plot/plot';
import { ILocationAddress } from 'src/app/models/plot/location-address';
import { Validation } from './validation';
import { IWorkSite } from 'src/app/models/plot/work-site';
import { productionDepartments, IDepartment } from 'src/app/models/plot/department';

@Component({
  selector: 'app-plots-form',
  templateUrl: './plots-form.component.html',
  styleUrls: ['./plots-form.component.scss']
})

export class PlotsFormComponent {

  readonly guildID = 1;
  readonly officeID = 2;
  readonly floor: AbstractControl;
  readonly workSite: AbstractControl;
  readonly room: AbstractControl;
  readonly place: AbstractControl;

  private plotsForm: FormGroup;
  private codeOfDepartment: number;
  private productionDepartments = new Array<string>();
  private locationAddresses = new Array<ILocationAddress>();
  private workSites = new Array<IWorkSite>();
  private arrayOfPlots = new Array<Plot>();
  private storage = new StorageService();
  private validation: Validation;

  private sideCode = new Array<number>();

  private partOfOfficeForm: boolean;
  private partOfGuildForm: boolean;
  private form: boolean;

  @Input() set openForm(value: boolean) { this.form = value; }
  @Output() closedForm = new EventEmitter<boolean>();
  @Output() plots = new EventEmitter<Array<Plot>>();

  constructor() {
    this.initProductionDepartment();
    this.initDatalist(StorageKey.LocationAddresses, this.locationAddresses);
    this.initDatalist(StorageKey.Plots,this.arrayOfPlots);
    this.createForm();
    this.floor = this.plotsForm.get('detailsInfo.floor');
    this.workSite = this.plotsForm.get('detailsInfo.workSite');
    this.room = this.plotsForm.get('detailsInfo.room');
    this.place = this.plotsForm.get('detailsInfo.place');
    this.validation = new Validation(this.floor, this.workSite, this.room, this.place);
    this.validation.clearValidations();
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

  private initProductionDepartment(): void {
    productionDepartments.forEach((department: IDepartment) => {
      this.productionDepartments.push(department.value);
    });
  }

  private initDatalist<T>(stogareKey: StorageKey, array: Array<T>): void {
    array.length = 0;
    if (this.storage.hasKey(stogareKey)) {
      const storageArray = this.storage.getData(stogareKey);
      storageArray.forEach((value: T) => {
        array.push(value);
      });
    }
  }

  private checkTypeOfDepartment(): void {
    const productionDepartment = this.plotsForm.get("commonInfo.productionDepartment").value;
    for (let department of productionDepartments) {
      if (department.value === productionDepartment) {
        this.setPartOfForm(department.key);
        this.codeOfDepartment = department.key;
        break;
      }
    }
  }

  private setPartOfForm(key: number): void {
    switch (key) {
      case this.guildID: {
        this.initDatalist(StorageKey.WorkSiteForGuild, this.workSites);
        this.validation.setValidatorsForGuild();
        this.partOfOfficeForm = false;
        this.partOfGuildForm = true;
        break;
      }
      case this.officeID: {
        this.initDatalist(StorageKey.WorkSiteForOffice, this.workSites);
        this.validation.setValidatorsForOffice();
        this.partOfOfficeForm = true;
        this.partOfGuildForm = false;
        break;
      }
      default: {
        this.validation.clearValidations();
        this.partOfOfficeForm = false;
        this.partOfGuildForm = false;
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
    this.sideCode.push(this.checkingForExistenceOfDatalist(newPlot.address, this.locationAddresses, StorageKey.LocationAddresses));
    this.sideCode.push(this.codeOfDepartment);
    if (this.sideCode[1] == this.guildID) {
      newPlot.floor = this.floor.value;
      this.sideCode.push(newPlot.floor);
      newPlot.workSite = this.workSite.value;
      this.sideCode.push(this.checkingForExistenceOfDatalist(newPlot.workSite, this.workSites, StorageKey.WorkSiteForGuild));
      newPlot.place = this.place.value;
      this.sideCode.push(newPlot.place);
    }
    else if (this.sideCode[1] == this.officeID) {
      newPlot.floor = this.floor.value;
      this.sideCode.push(newPlot.floor);
      newPlot.workSite = this.workSite.value;
      this.sideCode.push(this.checkingForExistenceOfDatalist(newPlot.workSite, this.workSites, StorageKey.WorkSiteForOffice));
      newPlot.room = this.room.value;
      newPlot.place = this.place.value;
      this.sideCode.push(newPlot.room);
      this.sideCode.push(newPlot.place);

    }
    newPlot.id = this.creaateIDforPlot(this.sideCode);
    this.arrayOfPlots.push(newPlot);
    this.rewriteStorage(StorageKey.Plots,this.arrayOfPlots);
    this.plotsForm.reset();
  }

  private creaateIDforPlot(elements: Array<number>): string {
    return elements.join('.');
  }

  private checkingForExistenceOfDatalist(element: string, array: Array<any>, storageKey: StorageKey): number {
    let codeElem: number;
    //Sorry, but here useing of "any" is necessary because I need to interact with various interfaces.
    let flag: boolean;
    if (array != null) {
      for (let value of array) {
        if (value.name == element) {
          flag = true;
          codeElem = value.id;
          break;
        }
      }
    }
    if (!flag) {
      let sizeArray = array.length;
      let newID = ((sizeArray === 0) ? 0 : (array[--sizeArray].id)) + 1;
      let newElement: any = { id: newID, name: element };
      array.push(newElement);
      codeElem = newID;
      this.rewriteStorage(storageKey, array);
    }
    return codeElem;
  }

  private rewriteStorage<T>(stogareKey: StorageKey, array: Array<T>): void {
    this.storage.deleteData(stogareKey);
    array.forEach((value: T) => {
      this.storage.addData(stogareKey, value);
    });
  }

  private onCancel(): void {
    this.closedForm.emit(false);
    this.plotsForm.reset();
  }
}