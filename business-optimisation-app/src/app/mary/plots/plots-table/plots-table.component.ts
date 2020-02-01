import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent implements OnInit {
  private canOpenTable: boolean;
  private isPlots: boolean ;
  private isLocationAddresses: boolean;
  private isWorkSitesForGuild: boolean;
  private isWorkSitesForOffice: boolean =true;
  
  @Input() set componentForTables(value: boolean) { this.canOpenTable = value; }
  @Output() collapseTable = new EventEmitter<boolean>();

  tableNames: Map<number, string> = new Map<number, string>();

  ngOnInit() {
  }

  constructor() {
    this.tableNames.set(1, 'Участки');
    this.tableNames.set(2, 'Адреса локаций');
    this.tableNames.set(3, 'Отделы');
    this.tableNames.set(4, 'Рабочие участки');
  }

  private openTable(value): void {
    switch (value) {
      case this.tableNames.get(1):
        this.setTable(true, false, false, false);
        break;
      case this.tableNames.get(2):
        this.setTable(false, true, false, false);
        break;
      case this.tableNames.get(3):
        this.setTable(false, false, true, false);
        break;
      case this.tableNames.get(4):
        this.setTable(false, false, false, true);
        break;
    }
  }

  private setTable(Plots: boolean, LocationAddresses: boolean, WorkSitesForOffice: boolean, WorkSitesForGuild: boolean): void {
    this.isPlots = Plots;
    this.isLocationAddresses = LocationAddresses;
    this.isWorkSitesForOffice = WorkSitesForOffice;
    this.isWorkSitesForGuild = WorkSitesForGuild;
  }
}
