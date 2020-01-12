import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from 'src/app/models/HR/Employee';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Plot } from 'src/app/models/plot';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-plots-form',
  templateUrl: './plots-form.component.html',
  styleUrls: ['./plots-form.component.scss']
})

export class PlotsFormComponent implements OnInit {

  private plotsForm: FormGroup;
  private items = new Array<Plot>();
  private employees = new Array<string>();
  private storage = new StorageService();
  private selectedEmployees = new Array<string>();
  private currentItem: Plot;

  @Output() plots = new EventEmitter<Array<Plot>>();
  @Input() set item(plot: Plot) {
    if (plot) {
      this.currentItem = plot;
      this.plotsForm.get("plotInfo.address").setValue(plot.address);
      this.plotsForm.get("plotInfo.plotname").setValue(plot.plotname);
      this.plotsForm.get("employeeInfo.employee").setValue(plot.employee);
      this.plotsForm.get("toolInfo.toolname").setValue(plot.toolname);
      this.plotsForm.get("toolInfo.tableNumber").setValue(plot.tableNumber);
      this.selectedEmployees = plot.responsible;
      this.setTextToTextArea(plot.responsible);
    }
  }

  private pushToTable(plots: Array<Plot>): void {
    this.plots.emit(plots);
  }

  constructor() {
    this.createForm();
    this.getEmployees();
  }

  ngOnInit() {
    this.getItems();
  }

  private createForm(): void {
    this.plotsForm = new FormGroup({
      plotInfo: new FormGroup({
        address: new FormControl(null),
        plotname: new FormControl(null)
      }),
      employeeInfo: new FormGroup({
        employee: new FormControl(null)
      }),
      toolInfo: new FormGroup({
        toolname: new FormControl(null),
        tableNumber: new FormControl(null),
        responsible: new FormControl(null),
        listResponsible: new FormControl(null)
      })
    })
  }

  private getItems(): void {
    this.items = this.storage.getData(StorageKey.Plots);
    this.pushToTable(this.items);
  }

  private find(value: string, array: Array<string>): boolean {
    for (let elem of array) {
      if (value === elem) {
        return false;
      }
    }
    return true;
  }

  private addResponsible(): void {
    const responsible = this.plotsForm.get("toolInfo.responsible").value;
    if (this.find(responsible, this.selectedEmployees) && responsible != null) {
      this.plotsForm.get("toolInfo.responsible").setValue(null);
      this.selectedEmployees.push(responsible);
      this.setTextToTextArea(this.selectedEmployees);
    }
  }

  private deleteResponsible(): void {
    const responsible = this.plotsForm.get("toolInfo.responsible").value;
    if (!this.find(responsible, this.selectedEmployees) && responsible != null) {
      this.plotsForm.get("toolInfo.responsible").setValue(null);
      const index = this.selectedEmployees.indexOf(responsible);
      this.selectedEmployees.splice(index, 1);
      this.setTextToTextArea(this.selectedEmployees);
    }
  }


  private getEmployees(): void {
    const employees: Employee[] = this.storage.getData(StorageKey.EmployeesStorageKey);
    employees.forEach((employee: Employee) => {
      this.employees.push(this.shortName(employee.firstName, employee.secondName, employee.patronymic));
    });
  }

  private shortName(name: string, lastname: string, patronymic: string): string {
    return lastname + ' ' + name.substr(0, 1) + '. ' + patronymic.substr(0, 1) + '.';
  }

  private add(): void {
    this.storage.addData(StorageKey.Plots, this.setRow());
    this.getItems();
  }

  private change(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1, this.setRow());
        break;
      }
    }
    this.rewriteStorage();
    this.getItems();
  }

  private delete(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === JSON.stringify(this.currentItem)) {
        this.items.splice(i, 1);
        break;
      }
    }
    this.rewriteStorage();
    this.getItems();
    this.selectedEmployees.length = 0;
    this.plotsForm.reset();
  }

  private setRow(): Plot {
    const item = new Plot();
    item.address = this.plotsForm.get("plotInfo.address").value;
    item.plotname = this.plotsForm.get("plotInfo.plotname").value;
    item.employee = this.plotsForm.get("employeeInfo.employee").value;
    item.toolname = this.plotsForm.get("toolInfo.toolname").value;
    item.tableNumber = this.plotsForm.get("toolInfo.tableNumber").value;
    item.responsible = this.selectedEmployees;
    return item;
  }

  private setTextToTextArea(employees: Array<string>): void {
    let shortNames: string = '';
    employees.forEach((employee: string) => {
      shortNames += employee;
      shortNames += "  ";
    });
    this.plotsForm.get("toolInfo.listResponsible").setValue(shortNames);
  }

  private rewriteStorage(): void {
    this.storage.deleteData(StorageKey.Plots);
    this.items.forEach(item => {
      this.storage.addData(StorageKey.Plots, item);
    });
  }
}
