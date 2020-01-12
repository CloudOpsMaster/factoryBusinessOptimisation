import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { GettingTools } from 'src/app/models/getting-tools';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/HR/Employee';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { Plot } from 'src/app/models/plot';

@Component({
  selector: 'app-getting-tools',
  templateUrl: './getting-tools.component.html',
  styleUrls: ['./getting-tools.component.scss']
})

export class GettingToolsComponent implements OnInit {
  private gettingToolsForm: FormGroup;
  private items: Array<GettingTools> = new Array<GettingTools>();
  private storage = new StorageService();
  private currentItem: GettingTools;

  private employees = new Array<Object>();
  private names = new Array<string>();
  private lastnames = new Array<string>();
  private tableNumbers = new Array<number>();
  private plotAddresses = new Array<string>();
  private plotNames = new Array<string>();
  private plots = new Array<Plot>();

  private positions = new Array<PositionInfo>()
  public disabled = false;
  public errorDate = false;

  notes: Array<string> = [
    'Выдан',
    'В ремонте',
    'Списание',
    'На складе'
  ];

  constructor() {
    this.initEmployees();
    this.initPositions();
    this.initPlots();
  }

  private initPlots(): void {
    this.plotAddresses = [];
    this.plotNames = [];
    this.plots = this.storage.getData(StorageKey.Plots);
    this.plots.forEach((plot: Plot) => {
      this.plotNames.push(plot.plotname);
      this.plotAddresses.push(plot.address);
    });
    this.plotNames = [...new Set(this.plotNames)];
   
    this.plotAddresses =  Array.from(new Set(this.plotAddresses));
  }

  private initPositions(): void {
    this.positions = this.storage.getData(StorageKey.EmployeePositionsStorageKey);
  }

  private initEmployees(): void {
    this.names = [];
    this.lastnames = [];
    this.tableNumbers = [];
    const employees = this.storage.getData(StorageKey.EmployeesStorageKey);
    employees.forEach((employee: Employee) => {
      this.employees.push({ id: employee.id, name: employee.firstName, lastname: employee.secondName });
      this.names.push(employee.firstName);
      this.lastnames.push(employee.secondName);
      this.tableNumbers.push(employee.id);
    });
    this.names = [...new Set(this.names)];
    this.lastnames = [...new Set(this.lastnames)];
  }

  ngOnInit() {
    this.items = this.storage.getData(StorageKey.GettingTools);
    this.createForm();
  }

  private createForm(): void {
    this.gettingToolsForm = new FormGroup({
      employeeInfo: new FormGroup({
        name: new FormControl(null),
        lastname: new FormControl(null),
        tableNumber: new FormControl(null),
        post: new FormControl(null),
        plotName: new FormControl(null),
        plotAddress: new FormControl(null)
      }),
      toolInfo: new FormGroup({
        inventoryNumber: new FormControl(null),
        tool: new FormControl(null),
        count: new FormControl(null)
      }),
      dateOfMovement: new FormGroup({
        dateOfIssue: new FormControl(null),
        dateOfReturn: new FormControl(null),
        note: new FormControl(null)
      })
    });

    this.checkDate();
  }

  private checkDate(): void {
    this.gettingToolsForm.get('dateOfMovement.dateOfIssue').valueChanges.subscribe((startDate) => {
      this.gettingToolsForm.get('dateOfMovement.dateOfReturn').valueChanges.subscribe((endDate) => {
        if (endDate != "") {
          this.errorDate = (startDate > endDate) ? true : false;
          this.disabled = (startDate > endDate) ? true : false;
        }
      })
    });

    this.gettingToolsForm.get('dateOfMovement.dateOfReturn').valueChanges.subscribe((endDate) => {
      this.gettingToolsForm.get('dateOfMovement.dateOfIssue').valueChanges.subscribe((startDate) => {
        if (endDate != "") {
          this.errorDate = (startDate > endDate) ? true : false;
          this.disabled = (startDate > endDate) ? true : false;
        }
      })
    });
  }

  private add(): void {
    this.storage.addData(StorageKey.GettingTools, this.setRow());
    this.items = this.storage.getData(StorageKey.GettingTools);
  }

  private change(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1, this.setRow());
        break;
      }
    }
    this.rewriteStorage();
  }

  private delete(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
    this.gettingToolsForm.reset();
  }

  private setRow(): GettingTools {
    const item = new GettingTools();
    item.name = this.gettingToolsForm.get("employeeInfo.name").value;
    item.lastname = this.gettingToolsForm.get("employeeInfo.lastname").value;
    item.plotName = this.gettingToolsForm.get("employeeInfo.plotName").value;
    item.plotAddress = this.gettingToolsForm.get("employeeInfo.plotAddress").value;
    item.post = this.gettingToolsForm.get("employeeInfo.post").value;
    item.tableNumber = this.gettingToolsForm.get("employeeInfo.tableNumber").value;
    item.inventoryNumber = this.gettingToolsForm.get("toolInfo.inventoryNumber").value;
    item.tool = this.gettingToolsForm.get("toolInfo.tool").value;
    item.count = this.gettingToolsForm.get("toolInfo.count").value;
    item.dateOfIssue = this.gettingToolsForm.get("dateOfMovement.dateOfIssue").value;
    item.dateOfReturn = this.gettingToolsForm.get("dateOfMovement.dateOfReturn").value;
    item.note = this.gettingToolsForm.get("dateOfMovement.note").value;
    return item;
  }

  private onRowClick(item: GettingTools): void {
    this.gettingToolsForm.get('employeeInfo.name').setValue(item.name);
    this.gettingToolsForm.get("employeeInfo.lastname").setValue(item.lastname);
    this.gettingToolsForm.get("employeeInfo.plotName").setValue(item.plotName);
    this.gettingToolsForm.get("employeeInfo.plotAddress").setValue(item.plotAddress);
    this.gettingToolsForm.get("employeeInfo.post").setValue(item.post);
    this.gettingToolsForm.get("employeeInfo.tableNumber").setValue(item.tableNumber);
    this.gettingToolsForm.get("toolInfo.inventoryNumber").setValue(item.inventoryNumber);
    this.gettingToolsForm.get("toolInfo.tool").setValue(item.tool);
    this.gettingToolsForm.get("toolInfo.count").setValue(item.count);
    this.gettingToolsForm.get("dateOfMovement.dateOfIssue").setValue(item.dateOfIssue);
    this.gettingToolsForm.get("dateOfMovement.dateOfReturn").setValue(item.dateOfReturn);
    this.gettingToolsForm.get("dateOfMovement.note").setValue(item.note);
    this.currentItem = item;
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKey.GettingTools);
    this.items.forEach(item => {
      this.storage.addData(StorageKey.GettingTools, item);
    });
  }

  private onKeyName(): void {
    this.lastnames.length = 0;
    this.tableNumbers.length = 0;
    const value = this.gettingToolsForm.get('employeeInfo.name').value;
    this.employees.forEach((employee: any) => {
      if (employee.name.includes(value)) {
        this.lastnames.push(employee.lastname);
        this.tableNumbers.push(employee.id);
      }
    });
  }

  private onKeyLastname(): void {
    this.names.length = 0;
    this.tableNumbers.length = 0;
    const value = this.gettingToolsForm.get('employeeInfo.lastname').value;
    this.employees.forEach((employee: any) => {
      if (employee.lastname.includes(value)) {
        this.names.push(employee.name);
        this.tableNumbers.push(employee.id);
      }
    });
  }
  
  private onKeyId(): void {
    this.names.length = 0;
    this.lastnames.length = 0;
    const value = this.gettingToolsForm.get('employeeInfo.tableNumber').value;
    this.employees.forEach((employee: any) => {
      if (employee.id == value) {
        this.names.push(employee.name);
        this.lastnames.push(employee.lastname);
      }
    });
  }

  private onKeyPlotName(): void {
    this.plotAddresses.length = 0;
    const value = this.gettingToolsForm.get('employeeInfo.plotName').value;
    this.plots.forEach((plot: Plot) => {
      if(plot.plotname.includes(value)){
        this.plotAddresses.push(plot.address);
      }
    })
  }

  private onKeyPlotAddress(): void {
    this.plotNames.length = 0;
    const value = this.gettingToolsForm.get('employeeInfo.plotAddress').value;
      this.plots.forEach((plot: Plot) => {
        if(plot.address.includes(value)){
          this.plotNames.push(plot.plotname);
        }
      })
  }
}
